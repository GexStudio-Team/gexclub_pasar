# Informe — Repositorio de skills para agentes

**Estado:** investigado, **no descargado ni instalado**. Se presenta antes de cualquier decisión de indexación.

## Candidatos comparados

| Repositorio | Titular | Stars aprox. | Licencia | Enfoque |
| --- | --- | ---: | --- | --- |
| [`mattpocock/skills`](https://github.com/mattpocock/skills) | @mattpocock | ~333.800 | MIT | Ingeniería práctica, skills pequeñas y composables. |
| [`obra/superpowers`](https://github.com/obra/superpowers) | @obra | ~327.700 | MIT | Metodología SDLC completa, multi-harness. |
| [`anthropics/skills`](https://github.com/anthropics/skills) | Anthropic | ~201.200 | Apache-2.0 con avisos de terceros | Implementación oficial de referencia del formato `SKILL.md`. |

## Recomendación

**`mattpocock/skills`** — <https://github.com/mattpocock/skills>

Es el más popular y el más activo de los tres (último push revisado: 25 nov 2026). Encaja con la búsqueda de “mejores agentes” por su orientación a arquitectura, TDD, revisión de código y flujos de spec → tickets → implementación. Si se quiere la fuente canónica del formato, la alternativa es `anthropics/skills`.

## Skills incluidas (resumen)

- **Ingeniería invocadas por el usuario (11):** `ask-matt`, `grill-with-docs`, `triage`, `improve-codebase-architecture`, `setup-matt-pocock-skills`, `to-spec`, `to-tickets`, `implement`, `implement-spec`, `wayfinder`, `retro`.
- **Ingeniería invocadas por el modelo (9):** `prototype`, `diagnosing-bugs`, `research`, `tdd`, `domain-modeling`, `codebase-design`, `code-review`, `pr`, `wizard`.
- **Productividad usuario (5):** `grill-me`, `handoff`, `teach`, `to-questionnaire`, `wait-what`.
- **Productividad modelo (2):** `grilling`, `writing-for-agents`.
- **Miscelánea (4):** `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit`.
- **Experimentales / en progreso (8):** `chief-of-staff`, `claude-handoff`, `loop-me`, `setup-ts-deep-modules`, `software-factory`, `writing-beats`, `writing-fragments`, `writing-shape`.

## Instalación (solo documentada, no ejecutada)

- Claude Code: `claude plugin install mattpocock-skills@claude-plugins-official`
- Codex: `codex plugin marketplace add mattpocock/skills` + `codex plugin add mattpocock-skills@mattpocock`
- GitHub Copilot: `copilot plugin marketplace add mattpocock/skills` + `copilot plugin install mattpocock-skills@mattpocock`
- Gemini CLI: `gemini skills install https://github.com/mattpocock/skills.git --path skills/engineering` (y `.../productivity`)
- Cursor, OpenCode, Devin, Windsurf, Amp, Pi: `npx skills@latest add mattpocock/skills -a <agente>`

Tras instalar, ejecutar una vez por repositorio `/setup-matt-pocock-skills`. El README advierte no instalar a la vez el plugin y las copias editables para evitar duplicados.

## Requisitos y riesgos

- Requiere un agente con soporte de plugins/skills o cargador de `SKILL.md`, y Node/npm para el instalador genérico.
- Algunas skills usan `gh`/`glab` para etiquetas, branches y PRs; otras escriben `CLAUDE.md`/`AGENTS.md` y `docs/agents/*.md`.
- `implement-spec` trabaja con branches, worktrees y subagentes; `improve-codebase-architecture` genera HTML con CDN externo.
- No se detectó `SECURITY.md`. Las skills se ejecutan con los permisos del usuario y las versiones `@latest` se resuelven desde remoto.
- El enfoque es opinionado (TDD, ADRs, léxico de dominio, issue tracker) y puede requerir adaptación al flujo actual de GexClub.

## Fuentes

- API: <https://api.github.com/repos/mattpocock/skills>, <https://api.github.com/repos/obra/superpowers>, <https://api.github.com/repos/anthropics/skills>
- READMEs: <https://github.com/mattpocock/skills/blob/main/README.md>, <https://github.com/anthropics/skills/blob/main/README.md>
- Índice: <https://skills.sh/mattpocock/skills>

**Decisión pendiente del usuario:** indexar o no el repositorio. No se ha descargado nada.
