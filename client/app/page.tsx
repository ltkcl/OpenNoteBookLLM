"use client";

import { FormEvent, useEffect, useState } from "react";
import { api, apiStream, apiUrl } from "@/lib/server-api";
import { BookOpen, Bot, FileText, Globe, LoaderCircle, LogOut, MessageSquare, Plus, Send, Sparkles, Trash2 } from "lucide-react";

type Workspace = { id: string; title: string; description?: string | null; icon?: string | null; defaultModel: string };
type Source = { id: string; title: string; type: string; status: string; url?: string | null };
type Conversation = { id: string; title?: string | null };
type ChatMessage = { id: string; role: "user" | "assistant"; content: string };
type Artifact = { id: string; title: string; type: string; status: string; content?: unknown };
type Session = { user: { name: string; email: string } } | null;

const buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50";
const inputClass = "w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

export default function Home() {
  const [session, setSession] = useState<Session>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [active, setActive] = useState<Workspace | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tab, setTab] = useState<"sources" | "chat" | "artifacts">("sources");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [workspaceTitle, setWorkspaceTitle] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceContent, setSourceContent] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  async function loadWorkspaces() {
    const items = await api<Workspace[]>("/api/workspaces");
    setWorkspaces(items);
    const selected = items.find((item) => item.id === active?.id) ?? items[0];
    if (selected) await loadWorkspace(selected);
    else setActive(null);
  }

  async function loadWorkspace(workspace: Workspace) {
    setActive(workspace);
    setError("");
    try {
      const [sourceItems, artifactItems, conversationItems] = await Promise.all([
        api<Source[]>(`/api/workspaces/${workspace.id}/sources`),
        api<Artifact[]>(`/api/workspaces/${workspace.id}/artifacts`),
        api<Conversation[]>(`/api/workspaces/${workspace.id}/conversations`),
      ]);
      setSources(sourceItems);
      setArtifacts(artifactItems);
      setConversations(conversationItems);
      setConversationId("");
      setMessages([]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load workspace data");
    }
  }

  useEffect(() => {
    api<Session>("/api/auth/get-session").then((value) => {
      setSession(value);
      if (value) void loadWorkspaces().catch((cause) => setError(cause.message));
    }).catch(() => setSession(null)).finally(() => setAuthReady(true));
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => {
      api<Artifact[]>(`/api/workspaces/${active.id}/artifacts`).then(setArtifacts).catch(() => {});
      api<Source[]>(`/api/workspaces/${active.id}/sources`).then(setSources).catch(() => {});
    }, 6000);
    return () => window.clearInterval(timer);
  }, [active]);

  async function submitAuth(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      await api(`/api/auth/${authMode}/email`, { method: "POST", body: JSON.stringify({ email, password, ...(authMode === "sign-up" ? { name } : {}) }) });
      const current = await api<Session>("/api/auth/get-session");
      setSession(current);
      await loadWorkspaces();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Authentication failed"); }
    finally { setBusy(false); }
  }

  async function createWorkspace(event: FormEvent) {
    event.preventDefault(); if (!workspaceTitle.trim()) return;
    setBusy(true); setError("");
    try {
      const created = await api<Workspace>("/api/workspaces", { method: "POST", body: JSON.stringify({ title: workspaceTitle }) });
      setWorkspaceTitle(""); setWorkspaces((existing) => [created, ...existing]); await loadWorkspace(created);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not create workspace"); }
    finally { setBusy(false); }
  }

  async function addSource(event: FormEvent) {
    event.preventDefault(); if (!active || !sourceTitle.trim() || !sourceContent.trim()) return;
    setBusy(true); setError("");
    try {
      await api(`/api/workspaces/${active.id}/sources`, { method: "POST", body: JSON.stringify({ type: "TEXT", title: sourceTitle, content: sourceContent }) });
      setSourceTitle(""); setSourceContent(""); await loadWorkspace(active);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not add source"); }
    finally { setBusy(false); }
  }

  async function addWebsite(event: FormEvent) {
    event.preventDefault(); if (!active || !websiteUrl.trim()) return;
    setBusy(true); setError("");
    try {
      await api(`/api/workspaces/${active.id}/sources/import/website`, { method: "POST", body: JSON.stringify({ url: websiteUrl }) });
      setWebsiteUrl(""); await loadWorkspace(active);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not import website"); }
    finally { setBusy(false); }
  }

  async function uploadPdf(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!active) return;
    const form = event.currentTarget;
    const file = new FormData(form);
    if (!file.get("file") || (file.get("file") as File).size === 0) return;
    setBusy(true); setError("");
    try {
      await api(`/api/workspaces/${active.id}/sources/upload`, { method: "POST", body: file });
      form.reset(); await loadWorkspace(active);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not upload PDF"); }
    finally { setBusy(false); }
  }

  async function removeSource(sourceId: string) {
    if (!active) return;
    try { await api(`/api/workspaces/${active.id}/sources/${sourceId}`, { method: "DELETE" }); setSources((items) => items.filter((item) => item.id !== sourceId)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete source"); }
  }

  async function createArtifact(type: string) {
    if (!active) return;
    setBusy(true); setError("");
    try {
      const artifact = await api<Artifact>(`/api/workspaces/${active.id}/artifacts`, { method: "POST", body: JSON.stringify({ type }) });
      setArtifacts((items) => [artifact, ...items]);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not create learning tool"); }
    finally { setBusy(false); }
  }

  async function openConversation(id: string) {
    if (!active) return;
    setConversationId(id); setError("");
    try {
      const rows = await api<Array<{ id: string; role: string; content: string }>>(`/api/workspaces/${active.id}/conversations/${id}/messages`);
      setMessages(rows.map((row) => ({ id: row.id, role: row.role.toLowerCase() as ChatMessage["role"], content: row.content })));
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load conversation"); }
  }

  async function sendChat(event: FormEvent) {
    event.preventDefault(); if (!active || !prompt.trim() || busy) return;
    const text = prompt.trim(); const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    const nextMessages = [...messages, userMessage]; setMessages(nextMessages); setPrompt(""); setBusy(true); setError("");
    try {
      const payload = { ...(conversationId ? { conversationId } : {}), messages: nextMessages.map((message) => ({ id: message.id, role: message.role, parts: [{ type: "text", text: message.content }] })) };
      const { response, reader } = await apiStream(`/api/workspaces/${active.id}/chat`, payload);
      const id = response.headers.get("X-Conversation-Id");
      if (id && id !== conversationId) {
        setConversationId(id);
        setConversations((items) => [{ id, title: text.slice(0, 48) }, ...items]);
      }
      if (!reader) throw new Error("The server did not return a response stream");
      const decoder = new TextDecoder(); let buffer = ""; let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const rows = buffer.split("\n"); buffer = rows.pop() ?? "";
        for (const row of rows) if (row.startsWith("0:")) {
          try { answer += JSON.parse(row.slice(2)); } catch { }
          setMessages([...nextMessages, { id: "assistant-stream", role: "assistant", content: answer }]);
        }
      }
      if (answer) setMessages([...nextMessages, { id: crypto.randomUUID(), role: "assistant", content: answer }]);
      if (id) api<Conversation[]>(`/api/workspaces/${active.id}/conversations`).then(setConversations).catch(() => {});
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not send message"); }
    finally { setBusy(false); }
  }

  async function signOut() {
    try { await api("/api/auth/sign-out", { method: "POST" }); } finally { setSession(null); setWorkspaces([]); setActive(null); }
  }

  if (!authReady) return <div className="grid min-h-screen place-items-center text-sm text-zinc-500"><LoaderCircle className="mr-2 animate-spin" size={16} /> Connecting to Chaillm</div>;

  if (!session) return <main className="grid min-h-screen bg-[#f5f6f3] lg:grid-cols-[1fr_440px]"><section className="hidden flex-col justify-between bg-zinc-950 p-12 text-white lg:flex"><div className="flex items-center gap-3 text-lg font-bold"><span className="grid size-10 place-items-center rounded-2xl bg-lime-300 text-zinc-950"><BookOpen size={21} /></span> chaiLLM</div><div className="max-w-xl"><p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-lime-300">Your personal learning space</p><h1 className="font-[var(--font-heading)] text-5xl font-semibold leading-tight">Make every source<br />a step forward.</h1><p className="mt-5 max-w-md text-base leading-7 text-zinc-400">Bring your notes, articles, and ideas together. Ask questions and turn what you learn into something you can use.</p></div><p className="text-xs text-zinc-500">A calmer way to learn with AI.</p></section><section className="flex items-center justify-center px-6 py-12"><form onSubmit={submitAuth} className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"><div className="mb-8 lg:hidden"><div className="flex items-center gap-3 font-bold"><span className="grid size-10 place-items-center rounded-2xl bg-lime-300"><BookOpen size={21} /></span> chaiLLM</div></div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">Welcome {authMode === "sign-in" ? "back" : "aboard"}</p><h2 className="mt-2 font-[var(--font-heading)] text-3xl font-semibold">{authMode === "sign-in" ? "Sign in" : "Create your account"}</h2><p className="mt-2 text-sm text-zinc-500">Continue to your learning workspace.</p>{error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}{authMode === "sign-up" && <label className="mt-6 block text-sm font-medium">Name<input className={`${inputClass} mt-2`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required /></label>}<label className="mt-6 block text-sm font-medium">Email<input className={`${inputClass} mt-2`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label className="mt-4 block text-sm font-medium">Password<input className={`${inputClass} mt-2`} type="password" autoComplete={authMode === "sign-in" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} /></label><button className={`${buttonClass} mt-6 w-full bg-emerald-700 hover:bg-emerald-800`} disabled={busy}>{busy && <LoaderCircle size={16} className="animate-spin" />}{authMode === "sign-in" ? "Sign in" : "Create account"}</button><button type="button" className="mt-5 w-full text-sm text-zinc-500 hover:text-zinc-900" onClick={() => { setAuthMode(authMode === "sign-in" ? "sign-up" : "sign-in"); setError(""); }}>{authMode === "sign-in" ? "New here? Create an account" : "Already have an account? Sign in"}</button><p className="mt-5 text-center text-xs text-zinc-400">API: {apiUrl}</p></form></section></main>;

  return <main className="min-h-screen bg-[#f5f6f3] text-zinc-900"><div className="mx-auto flex min-h-screen max-w-[1600px]"><aside className="hidden w-[270px] shrink-0 flex-col border-r border-zinc-200 bg-white p-5 md:flex"><div className="flex items-center gap-3 px-2 py-2"><span className="grid size-9 place-items-center rounded-xl bg-lime-300"><BookOpen size={19} /></span><span className="font-bold tracking-tight">chaiLLM</span></div><div className="mt-10 flex items-center justify-between px-2"><p className="text-[11px] font-bold uppercase tracking-[.18em] text-zinc-400">Workspaces</p><button title="New workspace" className="grid size-7 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100" onClick={() => document.getElementById("workspace-title")?.focus()}><Plus size={16} /></button></div><form onSubmit={createWorkspace} className="mt-3 flex gap-2"><input id="workspace-title" className="min-w-0 flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-emerald-500" placeholder="New workspace" value={workspaceTitle} onChange={(e) => setWorkspaceTitle(e.target.value)} /><button title="Create workspace" className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-900 text-white" disabled={busy}><Plus size={16} /></button></form><nav className="mt-3 space-y-1">{workspaces.map((workspace) => <button key={workspace.id} onClick={() => void loadWorkspace(workspace)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${active?.id === workspace.id ? "bg-emerald-50 font-semibold text-emerald-900" : "text-zinc-600 hover:bg-zinc-50"}`}><span className="grid size-8 place-items-center rounded-lg bg-zinc-100 text-base">{workspace.icon || "✳"}</span><span className="truncate">{workspace.title}</span></button>)}</nav><div className="mt-auto border-t border-zinc-100 pt-4"><div className="flex items-center gap-3 px-2"><div className="grid size-9 place-items-center rounded-full bg-zinc-900 text-sm font-semibold text-white">{session.user.name.slice(0, 1).toUpperCase()}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{session.user.name}</p><p className="truncate text-xs text-zinc-500">{session.user.email}</p></div><button onClick={() => void signOut()} title="Sign out" className="text-zinc-400 hover:text-zinc-900"><LogOut size={17} /></button></div></div></aside><section className="flex min-w-0 flex-1 flex-col"><header className="flex items-center justify-between border-b border-zinc-200 bg-white/80 px-5 py-4 backdrop-blur md:px-9"><div><p className="text-xs text-zinc-500">Your knowledge, in one place</p><h1 className="mt-0.5 font-[var(--font-heading)] text-xl font-semibold">{active?.title ?? "Your workspaces"}</h1></div><button className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 md:hidden" onClick={() => void signOut()}><LogOut size={16} /> Sign out</button><div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-500 sm:flex"><span className="size-2 rounded-full bg-emerald-500" /> Connected to server</div></header>{error && <div className="mx-5 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 md:mx-9">{error}<button className="ml-3 font-bold" onClick={() => setError("")}>Dismiss</button></div>}{!active ? <div className="flex flex-1 items-center justify-center p-8"><div className="max-w-md text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-lime-200"><Sparkles size={27} /></div><h2 className="mt-5 font-[var(--font-heading)] text-2xl font-semibold">Start a learning space</h2><p className="mt-2 text-sm leading-6 text-zinc-500">Create a workspace to collect sources, chat with your material, and generate study tools.</p><form onSubmit={createWorkspace} className="mt-6 flex gap-2"><input className={inputClass} placeholder="Workspace name" value={workspaceTitle} onChange={(e) => setWorkspaceTitle(e.target.value)} /><button className={buttonClass} disabled={busy}>Create</button></form></div></div> : <div className="flex min-h-0 flex-1 flex-col px-5 py-6 md:px-9"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-zinc-500">{active.description || "Your personal knowledge hub"}</p><div className="mt-3 flex items-center gap-2 text-xs text-zinc-400"><span>{sources.length} sources</span><span>·</span><span>{conversations.length} chats</span><span>·</span><span>{artifacts.length} learning tools</span></div></div><div className="flex rounded-xl border border-zinc-200 bg-white p-1">{(["sources", "chat", "artifacts"] as const).map((value) => <button key={value} onClick={() => setTab(value)} className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize ${tab === value ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"}`}>{value}</button>)}</div></div>
  {tab === "sources" && <div className="grid gap-5 xl:grid-cols-[1fr_360px]"><div className="rounded-2xl border border-zinc-200 bg-white p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Your sources</h2><p className="mt-1 text-sm text-zinc-500">Reference material for chat and study tools.</p></div><span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-500">{sources.length} total</span></div><div className="mt-5 divide-y divide-zinc-100">{sources.length ? sources.map((source) => <div key={source.id} className="flex items-center gap-3 py-4"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800">{source.type === "WEBSITE" ? <Globe size={18} /> : <FileText size={18} />}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{source.title}</p><p className="mt-1 text-xs text-zinc-500">{source.type} · <span className={source.status === "READY" ? "text-emerald-700" : source.status === "FAILED" ? "text-red-600" : "text-amber-700"}>{source.status}</span></p></div>{source.url && <a href={source.url} target="_blank" rel="noreferrer" className="hidden max-w-32 truncate text-xs text-zinc-400 hover:text-zinc-800 sm:block">Open</a>}<button title="Delete source" onClick={() => void removeSource(source.id)} className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></div>) : <div className="py-14 text-center"><div className="mx-auto grid size-12 place-items-center rounded-xl bg-zinc-100"><FileText size={20} className="text-zinc-500" /></div><p className="mt-3 text-sm font-semibold">No sources yet</p><p className="mt-1 text-sm text-zinc-500">Add a note, a web page, or a PDF to get started.</p></div>}</div></div><div className="space-y-5"><form onSubmit={addSource} className="rounded-2xl border border-zinc-200 bg-white p-5"><h3 className="font-semibold">Add a note</h3><p className="mt-1 text-sm text-zinc-500">Save text or markdown as a source.</p><input className={`${inputClass} mt-4`} placeholder="Title" value={sourceTitle} onChange={(e) => setSourceTitle(e.target.value)} required /><textarea className={`${inputClass} mt-3 min-h-28 resize-y`} placeholder="Paste or write your notes…" value={sourceContent} onChange={(e) => setSourceContent(e.target.value)} required /><button className={`${buttonClass} mt-3 w-full`} disabled={busy}><Plus size={16} /> Add source</button></form><form onSubmit={addWebsite} className="rounded-2xl border border-zinc-200 bg-white p-5"><h3 className="font-semibold">Import a website</h3><p className="mt-1 text-sm text-zinc-500">We’ll save the page content as a source.</p><input className={`${inputClass} mt-4`} type="url" placeholder="https://example.com/article" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required /><button className={`${buttonClass} mt-3 w-full`} disabled={busy}><Globe size={16} /> Import page</button></form><form onSubmit={uploadPdf} className="rounded-2xl border border-zinc-200 bg-white p-5"><h3 className="font-semibold">Upload a PDF</h3><input className="mt-4 block w-full text-sm text-zinc-500 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-2 file:text-xs file:font-semibold" type="file" name="file" accept="application/pdf,.pdf" required /><button className={`${buttonClass} mt-3 w-full`} disabled={busy}><Plus size={16} /> Upload PDF</button></form></div></div>}
  {tab === "chat" && <div className="grid min-h-[550px] flex-1 gap-5 xl:grid-cols-[250px_1fr]"><aside className="rounded-2xl border border-zinc-200 bg-white p-4"><button className={`${buttonClass} w-full`} onClick={() => { setConversationId(""); setMessages([]); }}><Plus size={16} /> New chat</button><h3 className="mb-2 mt-6 px-2 text-[11px] font-bold uppercase tracking-[.18em] text-zinc-400">Recent chats</h3><div className="space-y-1">{conversations.map((conversation) => <button key={conversation.id} onClick={() => void openConversation(conversation.id)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm ${conversation.id === conversationId ? "bg-emerald-50 text-emerald-900" : "text-zinc-600 hover:bg-zinc-50"}`}><MessageSquare size={16} className="shrink-0" /><span className="truncate">{conversation.title || "New conversation"}</span></button>)}</div></aside><div className="flex min-h-[550px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white"><div className="border-b border-zinc-100 px-5 py-4"><h2 className="font-semibold">Ask your workspace</h2><p className="mt-1 text-sm text-zinc-500">Answers are grounded in your sources when available.</p></div><div className="flex-1 space-y-4 overflow-y-auto p-5">{messages.length ? messages.map((message) => <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>{message.role === "assistant" && <div className="grid size-8 shrink-0 place-items-center rounded-full bg-lime-200"><Bot size={17} /></div>}<p className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-800"}`}>{message.content}</p></div>) : <div className="flex h-full min-h-64 flex-col items-center justify-center text-center"><div className="grid size-12 place-items-center rounded-2xl bg-lime-100"><Sparkles size={22} /></div><p className="mt-4 font-semibold">What are you learning today?</p><p className="mt-1 max-w-sm text-sm leading-6 text-zinc-500">Ask a question about your sources or explore a topic with your AI study partner.</p></div>}{busy && <p className="text-xs text-zinc-400">Thinking…</p>}</div><form onSubmit={sendChat} className="flex items-end gap-3 border-t border-zinc-100 p-4"><textarea className={`${inputClass} min-h-12 resize-none`} rows={2} placeholder="Ask a question…" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }} /><button className={`${buttonClass} size-12 shrink-0 p-0`} title="Send" disabled={busy || !prompt.trim()}><Send size={17} /></button></form></div></div>}
  {tab === "artifacts" && <div className="space-y-5"><div><h2 className="font-semibold">Study tools</h2><p className="mt-1 text-sm text-zinc-500">Generate useful learning materials from ready sources.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[["SUMMARY", "Summary"], ["TAKEAWAYS", "Key takeaways"], ["FLASHCARDS", "Flashcards"], ["QUIZ", "Quiz"], ["MINDMAP", "Mind map"], ["REPORT", "AI report"]].map(([type, title]) => <button key={type} className="group rounded-2xl border border-zinc-200 bg-white p-5 text-left transition hover:border-emerald-300 hover:shadow-sm disabled:opacity-50" onClick={() => void createArtifact(type)} disabled={busy || !sources.some((source) => source.status === "READY")}><div className="flex items-center justify-between"><div className="grid size-10 place-items-center rounded-xl bg-lime-100 text-zinc-800"><Sparkles size={18} /></div><Plus size={17} className="text-zinc-300 group-hover:text-emerald-700" /></div><p className="mt-4 font-semibold">{title}</p><p className="mt-1 text-sm text-zinc-500">Generate from your ready sources</p></button>)}</div><div className="rounded-2xl border border-zinc-200 bg-white p-5"><h3 className="font-semibold">Generated materials</h3>{artifacts.length ? <div className="mt-3 divide-y divide-zinc-100">{artifacts.map((artifact) => <div key={artifact.id} className="flex items-center gap-3 py-4"><div className="grid size-10 place-items-center rounded-xl bg-zinc-100"><FileText size={18} /></div><div className="flex-1"><p className="text-sm font-semibold">{artifact.title}</p><p className="mt-1 text-xs text-zinc-500">{artifact.type}</p></div><span className={`rounded-full px-3 py-1 text-xs font-medium ${artifact.status === "READY" ? "bg-emerald-50 text-emerald-800" : artifact.status === "FAILED" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"}`}>{artifact.status}</span></div>)}</div> : <p className="py-10 text-center text-sm text-zinc-500">No study tools generated yet.</p>}</div></div>}
  </div>}</section></div></main>;
}
