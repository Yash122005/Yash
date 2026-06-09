import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Terminal, Play, AlertCircle, CheckCircle2, X, TerminalSquare, Copy, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ToastState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
}

export const ContactTerminal: React.FC = () => {
  const [toast, setToast] = useState<ToastState>({ show: false, type: 'info', message: '' });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSuccessExecuted, setIsSuccessExecuted] = useState(false);
  const [isTypingCode, setIsTypingCode] = useState(true);

  // EmailJS configuration
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    mode: 'onChange',
  });

  const watchedValues = watch();

  // Custom Toast helper
  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ show: true, type, message });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Initial fake terminal typing simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingCode(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setLogs([
      '[info] Initiating handshake sequence...',
      `[info] Resolving target host: yashvinodgupta6@gmail.com...`,
      '[info] Wrapping payload variables...',
    ]);
    setIsSuccessExecuted(false);

    try {
      if (!serviceId || !templateId || !publicKey) {
        // Run simulator mode
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLogs((prev) => [
          ...prev,
          `[warn] VITE_EMAILJS_* keys missing. Operating in SANDBOX Simulator.`,
          `[info] Compiling details - Sender: "${data.name}" <${data.email}>`,
          `[info] Subject: "${data.subject}"`,
          `[info] Payload: "${data.message.substring(0, 25)}..."`,
          `[info] Deploying packets via local port...`,
        ]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLogs((prev) => [
          ...prev,
          `[success] Packet deployed successfully inside Sandbox.`,
          `[success] Handshake complete. Status: 200 OK.`,
        ]);
        setIsSuccessExecuted(true);
        showToast('success', 'Handshake simulation completed successfully. Message logged!');
        reset();
        return;
      }

      // Real EmailJS call
      const templateParams = {
        name: data.name,
        from_name: data.name,
        email: data.email,
        from_email: data.email,
        subject: data.subject,
        title: data.subject,
        message: data.message,
        to_name: "Yash Gupta",
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLogs((prev) => [...prev, '[info] Sending packets to live gateway...']);
      
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setLogs((prev) => [
        ...prev,
        `[success] Packet reached remote node successfully.`,
        `[success] Handshake sequence terminated. Response: 200 OK.`,
      ]);
      setIsSuccessExecuted(true);
      showToast('success', 'Handshake completed. Connection request delivered!');
      reset();
    } catch (err: any) {
      console.error(err);
      setLogs((prev) => [
        ...prev,
        `[error] Handshake aborted. Gateway rejected credentials.`,
        `[error] Error code: ${err?.status || '500'} - ${err?.text || 'Internal Server Error'}`
      ]);
      showToast('error', 'Handshake failed. Encryption protocol rejected.');
    }
  };

  const contactMethods = [
    {
      id: 0,
      title: 'Email Protocol',
      iconType: 'lucide' as const,
      icon: Mail,
      value: 'yashvinodgupta6@gmail.com',
      url: 'mailto:yashvinodgupta6@gmail.com',
    },
    {
      id: 1,
      title: 'LinkedIn Node',
      iconType: 'fa' as const,
      icon: 'fa-brands fa-linkedin-in',
      value: 'Connect professionally',
      url: 'https://www.linkedin.com/in/yash-gupta-8a8594283/',
    },
    {
      id: 2,
      title: 'GitHub Repository',
      iconType: 'fa' as const,
      icon: 'fa-brands fa-github',
      value: 'Review source codes',
      url: 'https://github.com/Yash122005',
    },
  ];


  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast('info', 'Address copied to clipboard.');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Particles generator helper
  const particles = [
    { left: '10%', top: '20%', size: '3px', delay: 0 },
    { left: '85%', top: '15%', size: '2px', delay: 1 },
    { left: '40%', top: '80%', size: '4px', delay: 1.5 },
    { left: '75%', top: '75%', size: '3px', delay: 0.5 },
    { left: '25%', top: '65%', size: '2px', delay: 2 },
  ];

  return (
    <section 
      id="contact"
      className="relative w-full min-h-screen py-24 overflow-hidden bg-[#030303] flex items-center justify-center border-t border-white/5 font-sans"
    >
      {/* Inline styles for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}} />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[160px] pointer-events-none select-none" />

      {/* Scanning Line */}
      <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent pointer-events-none z-0 animate-scanline" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] pointer-events-none opacity-40 z-0" />

      {/* Floating Cyber Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.1, y: 0 }}
          animate={{ opacity: [0.1, 0.4, 0.1], y: [-20, 20, -20] }}
          transition={{ duration: 6, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full bg-blue-400/40 blur-[1px] pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
        />
      ))}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column - Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          {/* Encrypted Channel Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs text-blue-400 font-mono tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(59,130,246,0.05)] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            ENCRYPTED CHANNEL
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
            Initialize
            <span className="block text-gray-500 mt-1">Handshake.</span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
            Got an ambitious project? I&apos;m ready to deploy. Fill out the terminal parameters or establish a direct connection.
          </p>

          {/* Contact Methods Cards */}
          <div className="space-y-4 max-w-md">
            {contactMethods.map((method, index) => {
              return (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative group block rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.02] overflow-hidden"
                >
                  {/* Subtle hover glow behind card */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 blur-xl transition-all duration-500" />
                  
                  <div className="flex items-center justify-between p-5">
                    <a 
                      href={method.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 flex-1 focus:outline-none"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-blue-400 group-hover:border-blue-500/20 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.15)] transition-all">
                        {method.iconType === 'lucide' ? (
                          <method.icon className="w-4 h-4" />
                        ) : (
                          <i className={`${method.icon} text-base`} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xs font-mono tracking-wider text-gray-500 group-hover:text-gray-400 uppercase transition-colors">{method.title}</h3>
                        <p className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors mt-0.5">{method.value}</p>
                      </div>
                    </a>

                    {/* Copy action for Email */}
                    {method.id === 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(method.value, method.id);
                        }}
                        className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] text-gray-500 hover:text-white transition-all flex items-center justify-center focus:outline-none"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === method.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column - Terminal Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="relative w-full rounded-2xl border border-white/10 bg-[#07080b]/85 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden group/editor"
        >
          {/* External ambient border glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover/editor:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />

          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-[#030406]/95">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]/80" />
            </div>
            
            {/* Active file tab */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] font-mono text-gray-400 select-none">
              <span className="text-[#3b82f6] font-bold">TS</span> contact.tsx
            </div>

            {/* Target shell label */}
            <div className="flex items-center gap-1 text-[10px] font-mono text-gray-600 uppercase tracking-widest select-none">
              <TerminalSquare className="w-3.5 h-3.5 text-gray-700" />
              BASH
            </div>
          </div>

          {/* Editor Contents */}
          <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
            {isTypingCode ? (
              <div className="h-64 flex flex-col justify-center items-center gap-3 text-gray-500 font-mono">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                <span>Initializing contact.tsx compiler environment...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-[auto_1fr] gap-x-4">
                  {/* Line Numbers column */}
                  <div className="text-gray-700 text-right select-none border-r border-white/5 pr-4 space-y-2.5 font-light">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                    <div>13</div>
                    <div>14</div>
                    <div>15</div>
                  </div>

                  {/* Code Snippet Form Column */}
                  <div className="space-y-2.5 text-gray-400">
                    {/* Line 1 */}
                    <div>
                      <span className="text-purple-400">import</span> {'{ send }'} <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;@emailjs/browser&apos;</span>;
                    </div>

                    {/* Line 2 */}
                    <div className="h-2" />

                    {/* Line 3 */}
                    <div>
                      <span className="text-purple-400">const</span> <span className="text-blue-400">sendMessage</span> = <span className="text-purple-400">async</span> () =&gt; {'{'}
                    </div>

                    {/* Line 4: Name parameter */}
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="pl-4 text-purple-400">const</span> <span className="text-blue-300">sender</span> = 
                      <span className="text-emerald-400">&quot;</span>
                      <div className="relative inline-block">
                        <input
                          type="text"
                          autoComplete="off"
                          placeholder="Your Name"
                          {...register('name', { required: true })}
                          className={`bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded text-emerald-400 placeholder-emerald-950 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-[140px] md:w-[180px] ${
                            errors.name ? 'border-red-500/50 underline decoration-wavy decoration-red-500/50 text-red-400' : ''
                          }`}
                        />
                      </div>
                      <span className="text-emerald-400">&quot;</span>;
                    </div>

                    {/* Line 5: Email parameter */}
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="pl-4 text-purple-400">const</span> <span className="text-blue-300">email</span> = 
                      <span className="text-emerald-400">&quot;</span>
                      <div className="relative inline-block">
                        <input
                          type="email"
                          autoComplete="off"
                          placeholder="email@example.com"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className={`bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded text-emerald-400 placeholder-emerald-950 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-[160px] md:w-[220px] ${
                            errors.email ? 'border-red-500/50 underline decoration-wavy decoration-red-500/50 text-red-400' : ''
                          }`}
                        />
                      </div>
                      <span className="text-emerald-400">&quot;</span>;
                    </div>

                    {/* Line 6: Subject parameter */}
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="pl-4 text-purple-400">const</span> <span className="text-blue-300">subject</span> = 
                      <span className="text-emerald-400">&quot;</span>
                      <div className="relative inline-block">
                        <input
                          type="text"
                          autoComplete="off"
                          placeholder="Subject"
                          {...register('subject', { required: true })}
                          className={`bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded text-emerald-400 placeholder-emerald-950 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all w-[140px] md:w-[185px] ${
                            errors.subject ? 'border-red-500/50 underline decoration-wavy decoration-red-500/50 text-red-400' : ''
                          }`}
                        />
                      </div>
                      <span className="text-emerald-400">&quot;</span>;
                    </div>

                    {/* Line 7 */}
                    <div className="h-2" />

                    {/* Line 8 */}
                    <div>
                      <span className="pl-4 text-purple-400">await</span> <span className="text-yellow-400">send</span>(<span>`</span>
                    </div>

                    {/* Line 9 & 10: Message body */}
                    <div className="pl-8 flex flex-col gap-1 w-full">
                      <div className="relative w-full">
                        <textarea
                          placeholder="Type your message here..."
                          rows={3}
                          {...register('message', { required: true, minLength: 5 })}
                          className={`w-full max-w-[450px] bg-white/[0.01] border border-white/5 rounded-lg p-2.5 text-emerald-400 placeholder-emerald-950/40 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all resize-none ${
                            errors.message ? 'border-red-500/50 underline decoration-wavy decoration-red-500/50 text-red-400' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Line 11 */}
                    <div>
                      <span className="pl-4">`</span>);
                    </div>

                    {/* Line 12 */}
                    <div>
                      {'}'};
                    </div>

                    {/* Line 13 */}
                    <div className="h-3" />

                    {/* Line 14: Action Button */}
                    <div className="flex items-center gap-4">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-bold border transition-all focus:outline-none ${
                          isSubmitting
                            ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 cursor-not-allowed'
                            : 'bg-blue-500 border-blue-600 hover:bg-blue-600 hover:border-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 rounded-full border border-blue-400 border-t-transparent animate-spin" />
                            EXECUTING...
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            EXECUTE_CODE()
                          </>
                        )}
                      </motion.button>

                      {/* Blinking Cursor Indicator */}
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-mono">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                        </span>
                        <span>Terminal Idle</span>
                        <span className="font-extrabold text-blue-400 animate-blink-cursor">_</span>
                      </div>
                    </div>

                    {/* Line 15 / Problems console & Logs */}
                    <div>
                      {/* Compiler Problems Pane */}
                      {Object.keys(errors).length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 border border-red-500/20 bg-red-950/10 p-4 rounded-xl text-red-400 w-full max-w-[500px]"
                        >
                          <div className="font-bold flex items-center gap-2 mb-2 text-xs">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            LINT ERRORS ({Object.keys(errors).length})
                          </div>
                          <div className="space-y-1 font-mono text-[11px] leading-relaxed">
                            {errors.name && (
                              <div>
                                <span className="text-gray-500 mr-2">contact.tsx:4:18</span>
                                <span className="text-red-300">Name parameter cannot be empty</span>
                              </div>
                            )}
                            {errors.email && (
                              <div>
                                <span className="text-gray-500 mr-2">contact.tsx:5:17</span>
                                <span className="text-red-300">{errors.email.message || 'Email protocol validation failed'}</span>
                              </div>
                            )}
                            {errors.subject && (
                              <div>
                                <span className="text-gray-500 mr-2">contact.tsx:6:19</span>
                                <span className="text-red-300">Subject header required</span>
                              </div>
                            )}
                            {errors.message && (
                              <div>
                                <span className="text-gray-500 mr-2">contact.tsx:9:5</span>
                                <span className="text-red-300">Payload requires body string (min length 5)</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Compiler Output Logs */}
                      {(logs.length > 0 || isSubmitting) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 border border-blue-500/20 bg-blue-950/5 p-4 rounded-xl text-[11px] text-gray-400 w-full max-w-[500px] font-mono leading-relaxed"
                        >
                          <div className="font-bold flex items-center gap-2 mb-2 text-blue-400 text-xs">
                            <Terminal className="w-3.5 h-3.5" />
                            COMPILER OUTPUT LOGS
                          </div>
                          <div className="space-y-1">
                            {logs.map((log, index) => {
                              let logColor = 'text-gray-400';
                              if (log.startsWith('[success]')) logColor = 'text-emerald-400 font-bold';
                              if (log.startsWith('[error]')) logColor = 'text-red-400 font-bold';
                              if (log.startsWith('[warn]')) logColor = 'text-yellow-400';
                              if (log.startsWith('[info]')) logColor = 'text-blue-400';
                              return (
                                <div key={index} className={logColor}>
                                  {log}
                                </div>
                              );
                            })}
                            {isSubmitting && (
                              <div className="text-blue-400 flex items-center gap-1.5 animate-pulse">
                                <span>[running] compiling source files...</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Custom Toast Notifications */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl shadow-2xl max-w-sm font-mono text-xs ${
              toast.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
                : toast.type === 'error'
                ? 'bg-red-950/80 border-red-500/30 text-red-300'
                : 'bg-zinc-950/80 border-zinc-500/30 text-zinc-300'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0" />}
            {toast.type === 'info' && <Terminal className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />}
            
            <div className="flex-1 leading-normal">{toast.message}</div>
            
            <button
              onClick={() => setToast((prev) => ({ ...prev, show: false }))}
              className="p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactTerminal;
