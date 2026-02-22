# Cursor Sandbox on Windows – What’s Going On & How to Fix It

## What you’re seeing

When the Cursor **Agent** runs terminal commands on **Windows**, you may see:

- **`Cursor Sandbox is unsupported`** (often with exit code 2)
- **`spawn EPERM`** when the agent runs commands that start child processes (e.g. `npm run test`, `node`, `curl.exe`)
- Commands that work in your **normal** terminal fail when run by the **Agent** terminal

So: the **sandbox** the Agent uses for the terminal is either not supported or very limited on Windows, and that leads to these errors.

## Why it happens

- The **Agent terminal** can use a **sandbox** so commands run in a restricted environment.
- **Sandbox support is solid on macOS and Linux** (e.g. Seatbelt on macOS, Landlock on Linux).
- On **Windows**, that same sandbox either:
  - isn’t implemented, or  
  - is “best-effort” and often fails (e.g. can’t spawn child processes, or reports “unsupported”).

So when the Agent tries to run in the sandbox on Windows, you get “Cursor Sandbox is unsupported” or EPERM-style failures.

## What to do (fixes)

### 1. Don’t rely on the sandbox on Windows (recommended)

Make the Agent run commands **outside** the sandbox so they behave like your normal terminal:

1. Open **Cursor Settings**: `Ctrl+Shift+J`.
2. Go to the **Agent** (or **Features → Agent**) section.
3. Find **“Auto-Run Mode”** (or similar: “Run terminal commands”, “Agent terminal”).
4. Change from **“Auto-run in Sandbox”** to one of:
   - **“Always ask”** – Cursor will ask before each command (no sandbox dependency).
   - **“Always run”** (or equivalent) – Commands run without sandbox; use only if you’re okay with less prompting.

After this, the Agent should stop trying to use the unsupported Windows sandbox and commands (e.g. `curl.exe`, `npm`, `powershell`) can run normally.

### 2. Use the Command Allowlist (optional)

If you use “Always ask” or a non-sandbox mode, you can still restrict what runs without approval:

- In the same **Agent** settings, look for **“Command Allowlist”** (or “Allowed commands”).
- Add commands the Agent is allowed to run without asking (e.g. `curl.exe`, `npm install`, `git status`).
- Commands not on the list will trigger a prompt.

Note: If “Auto-run in Sandbox” is on, the allowlist is often **ignored** on Windows, so turning off sandbox auto-run makes the allowlist useful.

### 3. Use WSL2 for a real sandbox (optional)

If you want the Agent to run in a **supported** sandbox:

- Install **WSL2** and a Linux distro.
- In Cursor (or VS Code) set the **default terminal** to **WSL** (e.g. “Ubuntu”).
- The Agent will run commands inside WSL, where the sandbox is supported.

Steps (brief):

- **Terminal → Select Default Profile** (or Settings → search “default profile windows”).
- Choose your WSL profile (e.g. **Ubuntu**).
- New Agent terminal sessions will use WSL; sandbox and commands should work there.

### 4. If you still see SSL/certificate errors (e.g. with `curl`)

The “Cursor Sandbox is unsupported” message is separate from **SSL/certificate** errors (e.g. `CRYPT_E_NO_REVOCATION_CHECK` with `curl.exe`). For those:

- Use **`curl.exe -L --ssl-no-revoke`** when calling HTTPS URLs from scripts, or
- Run the same command in a **normal** Windows terminal (outside Cursor) to confirm it’s a system/curl issue, not the Agent.

## Summary

| Issue | Cause | Fix |
|--------|--------|-----|
| “Cursor Sandbox is unsupported” / exit 2 | Sandbox not (fully) supported on Windows | **Cursor Settings → Agent → set Auto-Run Mode to “Always ask” (or “Always run”) instead of “Auto-run in Sandbox”** |
| `spawn EPERM` when Agent runs commands | Sandbox blocking child processes on Windows | Same: disable “Auto-run in Sandbox” so commands run outside sandbox |
| Allowlist not working | Sandbox mode overrides allowlist on Windows | Use “Always ask” (or similar) so allowlist applies |

**TL;DR:** On Windows, open Cursor Settings (`Ctrl+Shift+J`) → Agent → switch **off** “Auto-run in Sandbox” (use “Always ask” or “Always run” instead). That’s what’s needed to fix the Cursor sandbox behavior you’re hitting.
