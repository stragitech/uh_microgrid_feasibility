## General Coding Style

- **Always prefer simple solutions.** Prioritize clear, concise code that is easy to understand.  
- **Avoid duplication of code.** Check for existing code before adding new functionality. If similar code exists, refactor it to avoid repetition.  
- **Separate Dev, Test, and Prod environments.** Ensure distinct environments for development, testing, and production to prevent conflicts.

## Working with AI Agents

- **Only make changes that are requested or well understood.** Focus on the specific task at hand and avoid unintended modifications.  
- **Minimize the scope of agent requests.** Break down large tasks into smaller, more manageable requests.  
- **Avoid introducing new patterns or technologies without exhausting existing options.** Prioritize fixing existing code before resorting to new approaches.  
- **Remove old implementations after introducing new ones.** Prevent duplicate logic by deleting superseded code.  
- **Keep the codebase clean and organized.** Maintain a well‑structured codebase to facilitate readability and maintainability.  
- **Avoid one‑off scripts.** Either execute scripts inline or delete them after use.  
- **Refactor files over 200–300 lines.** Large files can become unwieldy and difficult for AI agents to handle.  
- **Never use mock data for Dev or Prod environments.** Mock data should only be used in testing environments to ensure accurate functionality.  
- **Don't overwrite API keys in files.** Protect API keys by avoiding automatic overwriting.

## Stack Preferences

- **Use a popular stack.** Opt for widely adopted technologies for better AI performance and documentation support.  
  - **Back‑end:** Python  
  - **Front‑end:** HTML, JavaScript, React, Bootstrap
  - **Database:** SQL (separate databases for Dev, Test, and Prod)  
  - **Search:** Elastic Search (hosted version)

## Coding Workflow

- **Focus on relevant code.** Concentrate on the code directly related to the task.  
- **Write thorough tests for all major functionality.** Ensure adequate test coverage.  
- **Avoid major architectural changes without explicit instructions.** Maintain existing patterns unless specifically directed otherwise.  
- **Consider potential impacts of code changes.** Evaluate the effects on other parts of the codebase. 

## When Adding Text
- **Special Characters.**  For a single quote ('): use &apos; or &#39; For a double quote ("): use &quot; or &#34;
