<!-- imo.cv Product-Led Home Page -->
<!DOCTYPE html>

<html lang="pt"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv - A plataforma imobiliária oficial de Cabo Verde</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              colors: {
                "primary": "#ec7f13",
                "background-light": "#f8f7f6",
                "background-dark": "#221910",
                "brand-blue": "#005baa",
                "brand-green": "#008542",
              },
              fontFamily: {
                "display": ["Inter", "sans-serif"]
              },
              borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
            },
          },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        .hero-gradient {
            background: linear-gradient(135deg, #005baa 0%, #008542 100%);
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
<!-- Header / Navigation -->
<header class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md px-4 md:px-10 py-3">
<div class="max-w-7xl mx-auto flex items-center justify-between">
<div class="flex items-center gap-2 group cursor-pointer">
<div class="bg-primary text-white p-1 rounded-lg">
<span class="material-symbols-outlined text-2xl block">domain</span>
</div>
<h1 class="text-xl font-black tracking-tight text-slate-900 dark:text-white">imo.cv</h1>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Soluções</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Preços</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Sobre</a>
</nav>
<div class="flex items-center gap-4">
<button class="hidden sm:block text-sm font-semibold px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Entrar</button>
<button class="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all shadow-sm">
                    Começar agora
                </button>
</div>
</div>
</header>
<main>
<!-- Hero Section -->
<section class="hero-gradient relative py-20 px-4 overflow-hidden">
<div class="max-w-5xl mx-auto text-center relative z-10">
<div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold mb-6 border border-white/20">
<span class="flex h-2 w-2 rounded-full bg-primary"></span>
                    PLATAFORMA LÍDER EM CABO VERDE
                </div>
<h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                    A plataforma imobiliária oficial de Cabo Verde
                </h1>
<p class="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Profissionalizando o mercado imobiliário com transparência, tecnologia e dados para agências, condomínios e investidores.
                </p>
<div class="flex flex-wrap justify-center gap-4">
<button class="flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
<span class="material-symbols-outlined">apartment</span>
                        Para Agências
                    </button>
<button class="flex items-center gap-2 bg-brand-green text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
<span class="material-symbols-outlined">groups</span>
                        Condomínios
                    </button>
<button class="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
<span class="material-symbols-outlined">trending_up</span>
                        Investidores
                    </button>
</div>
</div>
<!-- Decorative Pattern (CSS only) -->
<div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
</section>
<!-- Solutions Grid -->
<section class="py-24 px-4 max-w-7xl mx-auto">
<div class="text-center mb-16">
<h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">Nossas Soluções</h2>
<p class="text-slate-600 dark:text-slate-400">Ferramentas desenhadas especificamente para o contexto cabo-verdiano.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<!-- CRM Agências -->
<div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col hover:border-brand-blue/50 transition-colors">
<div class="text-brand-blue mb-6">
<span class="material-symbols-outlined text-4xl">real_estate_agent</span>
</div>
<h3 class="text-xl font-bold mb-2">CRM para Agências</h3>
<div class="flex items-baseline gap-1 mb-6">
<span class="text-3xl font-black">4.500</span>
<span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">CVE/mês</span>
</div>
<ul class="space-y-4 mb-8 flex-grow">
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Gestão centralizada de Leads
                        </li>
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Publicação em Portais Globais
                        </li>
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Relatórios Automáticos de Vendas
                        </li>
<li class="flex items-center gap-3 text-sm text-slate-400">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Acesso Mobile para Corretores
                        </li>
</ul>
<button class="w-full py-3 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold hover:bg-brand-blue hover:text-white transition-all">Saber Mais</button>
</div>
<!-- Gestão Condomínios -->
<div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border-2 border-primary shadow-xl flex flex-col relative transform scale-105">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Mais Popular</div>
<div class="text-primary mb-6">
<span class="material-symbols-outlined text-4xl">home_work</span>
</div>
<h3 class="text-xl font-bold mb-2">Gestão de Condomínios</h3>
<div class="flex items-baseline gap-1 mb-6">
<span class="text-3xl font-black">500</span>
<span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">CVE/unidade</span>
</div>
<ul class="space-y-4 mb-8 flex-grow">
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Transparência Financeira Real
                        </li>
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            App Exclusiva para Moradores
                        </li>
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Gestão de Manutenção Preventiva
                        </li>
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Emissão de Faturas Automática
                        </li>
</ul>
<button class="w-full py-3 px-4 rounded-lg bg-primary text-white font-bold hover:brightness-110 transition-all shadow-md">Saber Mais</button>
</div>
<!-- Market Intelligence -->
<div class="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col hover:border-primary/50 transition-colors">
<div class="text-slate-700 dark:text-slate-300 mb-6">
<span class="material-symbols-outlined text-4xl">insights</span>
</div>
<h3 class="text-xl font-bold mb-2">Market Intelligence</h3>
<div class="flex items-baseline gap-1 mb-6">
<span class="text-3xl font-black">10.000</span>
<span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">CVE/mês</span>
</div>
<ul class="space-y-4 mb-8 flex-grow">
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Dados Reais do Mercado Local
                        </li>
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Análise de ROI por Ilha
                        </li>
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            Relatórios de Benchmarking
                        </li>
<li class="flex items-center gap-3 text-sm">
<span class="material-symbols-outlined text-brand-green">check_circle</span>
                            API para Desenvolvedores
                        </li>
</ul>
<button class="w-full py-3 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold hover:bg-slate-900 hover:text-white transition-all">Saber Mais</button>
</div>
</div>
</section>
<!-- Trust Section / Testimonials -->
<section class="bg-slate-100 dark:bg-slate-950 py-24 px-4">
<div class="max-w-7xl mx-auto">
<div class="text-center mb-16">
<h2 class="text-3xl font-black text-slate-900 dark:text-white mb-4">Confiança em todas as Ilhas</h2>
<p class="text-slate-600 dark:text-slate-400">Junte-se a centenas de profissionais que já transformaram sua gestão.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Testimonial 1 -->
<div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
<div class="flex items-center gap-4 mb-4">
<img class="w-12 h-12 rounded-full bg-slate-100" data-alt="Portrait of a professional man smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB-rghDpceKznsu8I1-Hxmnzm14HiB5mf9qEUFUalfiO62EbVGYlwIyXpGeIx-p0waZKBqcEoUrj7e0fbPFV4VVY8ByxbZa2CTOT-OGkaaPlzjt_s0wvzGQEd6tiAwoTR1tqB580_JR9O0P0p_8HTF3yFcutD9RAlP4429OwS-EmQMWdULooncmsZ0Wh4ULSbtSe2O5I-SwAtcqbNhBQfs5tGeZMtKCRsebsXcSAGeux2wdxrCxpz74coHlUVbZYCq9nE5RNgvXRQ"/>
<div>
<h4 class="font-bold text-sm">Carlos Silva</h4>
<span class="bg-brand-blue/10 text-brand-blue text-[10px] font-black px-2 py-0.5 rounded uppercase">Sal</span>
</div>
</div>
<p class="text-sm text-slate-600 dark:text-slate-400 italic">"O CRM da imo.cv mudou a forma como gerimos os nossos investidores europeus. A transparência é total."</p>
</div>
<!-- Testimonial 2 -->
<div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
<div class="flex items-center gap-4 mb-4">
<img class="w-12 h-12 rounded-full bg-slate-100" data-alt="Portrait of a professional woman smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXhxLPICMPiAhGBAJm55rLI38LE4C0digmyrS55tRdlI-YdEBHfpdYdUDGof1pnYNi43kp_fgcP3xtsZca8W1JZx1FyJHMqvStsgGgPcySqKXz7KzQHv7RleSSVvdD_96a1EC2JUD-40i_freT4f0wGk1n1_JckONrwFx3uuyuLeagjF0ylPuAevAIvIFGfaCSEr2C7S7u34tc3QdcLm-NVKxvKJUKT0CLr6zNBRcM5xIH728zhV1jhWsdgdkMNXnG2bCFuwatvWs"/>
<div>
<h4 class="font-bold text-sm">Maria Varela</h4>
<span class="bg-brand-green/10 text-brand-green text-[10px] font-black px-2 py-0.5 rounded uppercase">Santiago</span>
</div>
</div>
<p class="text-sm text-slate-600 dark:text-slate-400 italic">"A gestão de condomínios era um caos até usarmos a imo.cv. Hoje os moradores pagam as quotas pela App."</p>
</div>
<!-- Testimonial 3 -->
<div class="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
<div class="flex items-center gap-4 mb-4">
<img class="w-12 h-12 rounded-full bg-slate-100" data-alt="Portrait of a young real estate agent" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKpA7Ag6iucle7YCqk_olKZrfViM8Zcn-v5H1MxWHKCeioUrmXY87wPbD2x58LLGgMRkKE4dEwhCJ2zZJI9fPNmEcOjbT_Ej4CGZOCPjC7JSAArxBMB855RV_HdGhdA0RY4FA3NSxQVxbkSgD3-676_NkokrkMHzo4oUWU7ogX9ZPlbGZuwXi7tO8mHhIDlbNG7o6r5bBozqVvWHpoEf6_Nyzyku_-OyxNeO9WlJ0dl5zeAOIJdr7H53tzbYgiPqmkMPIcetbDZUA"/>
<div>
<h4 class="font-bold text-sm">António Lopes</h4>
<span class="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded uppercase">Boa Vista</span>
</div>
</div>
<p class="text-sm text-slate-600 dark:text-slate-400 italic">"Os dados de Market Intelligence são vitais para as nossas decisões de novos empreendimentos turísticos."</p>
</div>
</div>
</div>
</section>
<!-- FAQ Section -->
<section class="py-24 px-4 max-w-3xl mx-auto">
<h2 class="text-3xl font-black text-center mb-12">Perguntas Frequentes</h2>
<div class="space-y-4">
<details class="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800" open="">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
<span class="font-bold">A plataforma funciona sem internet estável?</span>
<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Sim, a imo.cv foi desenhada para o contexto local. Possuímos um modo offline para as apps de campo e o carregamento web é otimizado para ligações 3G.
                    </div>
</details>
<details class="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
<span class="font-bold">Como é feito o pagamento das mensalidades?</span>
<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Aceitamos Vinti4, transferência bancária para o BCA ou Caixa, e pagamentos via cartão internacional para investidores estrangeiros.
                    </div>
</details>
<details class="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
<span class="font-bold">Existe apoio técnico local?</span>
<span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Sim! Temos equipas de suporte na Praia e Mindelo disponíveis de Segunda a Sábado para formação e ajuda técnica presencial se necessário.
                    </div>
</details>
</div>
</section>
<!-- Footer -->
<footer class="bg-background-dark text-slate-400 py-16 px-4">
<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
<div class="space-y-4">
<div class="flex items-center gap-2 text-white">
<span class="material-symbols-outlined text-primary text-2xl">domain</span>
<span class="text-xl font-black">imo.cv</span>
</div>
<p class="text-sm">A maior infraestrutura tecnológica para o mercado imobiliário em Cabo Verde.</p>
</div>
<div>
<h5 class="text-white font-bold mb-4">Soluções</h5>
<ul class="space-y-2 text-sm">
<li><a class="hover:text-primary" href="#">CRM Agências</a></li>
<li><a class="hover:text-primary" href="#">Gestão de Condomínios</a></li>
<li><a class="hover:text-primary" href="#">Market Intelligence</a></li>
</ul>
</div>
<div>
<h5 class="text-white font-bold mb-4">Empresa</h5>
<ul class="space-y-2 text-sm">
<li><a class="hover:text-primary" href="#">Sobre Nós</a></li>
<li><a class="hover:text-primary" href="#">Termos de Uso</a></li>
<li><a class="hover:text-primary" href="#">Contacto</a></li>
</ul>
</div>
<div>
<h5 class="text-white font-bold mb-4">Newsletter</h5>
<div class="flex gap-2">
<input class="bg-slate-800 border-none rounded-lg text-sm flex-grow" placeholder="Seu email" type="email"/>
<button class="bg-primary text-white p-2 rounded-lg">
<span class="material-symbols-outlined">send</span>
</button>
</div>
</div>
</div>
<div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
                © 2024 imo.cv - Professionalizing Cape Verde Real Estate.
            </div>
</footer>
</main>
</body></html>

<!-- Agencies CRM Sales Page -->
<!DOCTYPE html>

<html lang="pt"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv CRM | O CRM Líder para Imobiliárias em Cabo Verde</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#1e3b8a", // Trust Blue
                        "success": "#10b981", // Emerald Green
                        "accent": "#f59e0b",  // Golden Sand for badges
                        "background-light": "#f8fafc",
                        "background-dark": "#121620",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary/30">
<div class="relative flex min-h-screen flex-col overflow-x-hidden">
<!-- Top Navigation -->
<header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80 px-4 md:px-20 lg:px-40 py-3">
<div class="mx-auto flex max-w-7xl items-center justify-between">
<div class="flex items-center gap-2">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
<span class="material-symbols-outlined text-2xl">real_estate_agent</span>
</div>
<h2 class="text-xl font-black tracking-tight text-primary">imo.cv <span class="text-slate-500 font-medium">CRM</span></h2>
</div>
<nav class="hidden items-center gap-8 md:flex">
<a class="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#funcionalidades">Funcionalidades</a>
<a class="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#precos">Preços</a>
<a class="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#parceiros">Clientes</a>
</nav>
<div class="flex items-center gap-3">
<button class="hidden lg:block text-sm font-bold text-slate-700 px-4 py-2 hover:bg-slate-100 rounded-lg transition-all">Entrar</button>
<button class="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                        Solicitar Demo
                    </button>
</div>
</div>
</header>
<main class="flex-1">
<!-- Hero Section -->
<section class="relative px-4 py-16 md:px-20 lg:px-40 lg:py-24">
<div class="mx-auto flex max-w-7xl flex-col lg:flex-row items-center gap-12">
<div class="flex-1 space-y-6 text-center lg:text-left">
<div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
                            Líder em Cabo Verde
                        </div>
<h1 class="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                            Transforme a sua Agência com o CRM <span class="text-primary">Líder Nacional</span>
</h1>
<p class="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                            Aumente a eficiência da sua equipa e acelere o crescimento da sua imobiliária com ferramentas desenhadas exclusivamente para o mercado de Cabo Verde.
                        </p>
<div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
<button class="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform">
                                Solicitar Demonstração Gratuita
                                <span class="material-symbols-outlined">arrow_forward</span>
</button>
<div class="flex items-center gap-2 text-slate-500 text-sm">
<span class="material-symbols-outlined text-success">verified_user</span>
                                Sem compromisso
                            </div>
</div>
</div>
<div class="flex-1 relative w-full">
<div class="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/50">
<div class="h-[400px] w-full bg-slate-100 rounded-xl bg-cover bg-center" data-alt="Professional real estate agent using a clean CRM dashboard on a computer screen" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw3X0QeBBHvdbqaDqmarUu-qGSg53J95tiUpEEtF1SyIoYdHYRNBHvg9ULPz4sdL7OAzsl6q4I5tQuQefq8zth0QhHFV2i59xgmn_6PTFmrvtuLNkqKVEjjmdeT-m29WeLrhaCyZ8w1ddtQ16D5kkE2UUAkUmLM6SWI1NJBGOZfM5EhDCW9p0tl5z-gd-C9b7I4KmyRITdqsHAYmJrV1Ev1sOoOph0zGhl0iAjg176vnKFFLoaHujQ-LZOQHf4sQ428SUIOItSzt4')"></div>
<div class="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3">
<div class="bg-success/20 p-2 rounded-full">
<span class="material-symbols-outlined text-success">trending_up</span>
</div>
<div>
<p class="text-xs font-bold text-slate-500">CRESCIMENTO</p>
<p class="text-xl font-black text-slate-900">+42% Vendas</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Social Proof: Partners -->
<section class="bg-slate-50 py-12 px-4 md:px-20 lg:px-40" id="parceiros">
<div class="mx-auto max-w-7xl">
<p class="mb-8 text-center text-sm font-bold uppercase tracking-widest text-slate-400">Confiado pelas melhores agências em Cabo Verde</p>
<div class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
<!-- Placeholder logos simulating local brands -->
<div class="flex items-center gap-2 font-black text-2xl">CV<span class="text-primary">Imóveis</span></div>
<div class="flex items-center gap-2 font-black text-2xl">Praia<span class="text-primary">House</span></div>
<div class="flex items-center gap-2 font-black text-2xl">Mindelo<span class="text-primary">Estates</span></div>
<div class="flex items-center gap-2 font-black text-2xl">Sal<span class="text-primary">Invest</span></div>
<div class="flex items-center gap-2 font-black text-2xl">BoaVista<span class="text-primary">Luxury</span></div>
</div>
</div>
</section>
<!-- Feature Grid -->
<section class="py-20 px-4 md:px-20 lg:px-40" id="funcionalidades">
<div class="mx-auto max-w-7xl text-center mb-16">
<h2 class="text-3xl font-black text-slate-900 md:text-4xl mb-4">Funcionalidades Pensadas para o Seu Sucesso</h2>
<p class="text-slate-600 max-w-2xl mx-auto">Ferramentas robustas que garantem agilidade do primeiro contacto no WhatsApp ao fecho de vendas.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Card 1 -->
<div class="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-xl transition-all">
<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-3xl">chat</span>
</div>
<h3 class="text-xl font-bold text-slate-900 mb-2">Gestão de Leads WhatsApp</h3>
<p class="text-slate-600 text-sm leading-relaxed">Integração direta para responder instantaneamente aos seus clientes sem sair da plataforma.</p>
</div>
<!-- Card 2 -->
<div class="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-xl transition-all">
<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-3xl">view_kanban</span>
</div>
<h3 class="text-xl font-bold text-slate-900 mb-2">Funil Kanban</h3>
<p class="text-slate-600 text-sm leading-relaxed">Visualize o progresso de cada negócio de forma clara e intuitiva com arrastar e soltar.</p>
</div>
<!-- Card 3 -->
<div class="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-xl transition-all">
<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-3xl">bar_chart</span>
</div>
<h3 class="text-xl font-bold text-slate-900 mb-2">Analytics de Vendas</h3>
<p class="text-slate-600 text-sm leading-relaxed">Relatórios precisos em tempo real para tomar as melhores decisões estratégicas para a sua agência.</p>
</div>
<!-- Card 4 -->
<div class="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-xl transition-all">
<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-3xl">sync_alt</span>
</div>
<h3 class="text-xl font-bold text-slate-900 mb-2">Automação de Anúncios</h3>
<p class="text-slate-600 text-sm leading-relaxed">Poupe tempo com a distribuição automática dos seus imóveis nos maiores portais de Cabo Verde.</p>
</div>
</div>
</section>
<!-- Pricing Section -->
<section class="bg-primary/5 py-24 px-4 md:px-20 lg:px-40" id="precos">
<div class="mx-auto max-w-7xl">
<div class="text-center mb-16">
<h2 class="text-3xl font-black text-slate-900 md:text-4xl mb-4">Investimento que Gera Retorno</h2>
<p class="text-slate-600">Escolha o plano ideal para a dimensão da sua equipa.</p>
</div>
<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
<!-- Starter Plan -->
<div class="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
<div class="mb-8">
<h3 class="text-lg font-bold text-slate-900 uppercase tracking-widest mb-2">Starter</h3>
<div class="flex items-baseline gap-1">
<span class="text-4xl font-black text-slate-900">4.500</span>
<span class="text-slate-500 font-bold">CVE/mês</span>
</div>
<p class="text-slate-500 text-sm mt-4">Essencial para agentes independentes e pequenas equipas.</p>
</div>
<ul class="space-y-4 mb-10 flex-1">
<li class="flex items-center gap-3 text-slate-600">
<span class="material-symbols-outlined text-success">check_circle</span> Gestão Ilimitada de Imóveis
                                </li>
<li class="flex items-center gap-3 text-slate-600">
<span class="material-symbols-outlined text-success">check_circle</span> Até 5 Utilizadores
                                </li>
<li class="flex items-center gap-3 text-slate-600">
<span class="material-symbols-outlined text-success">check_circle</span> CRM Básico &amp; Funil
                                </li>
<li class="flex items-center gap-3 text-slate-600">
<span class="material-symbols-outlined text-success">check_circle</span> Suporte via Email
                                </li>
</ul>
<button class="w-full py-4 px-6 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                                Começar com Starter
                            </button>
</div>
<!-- Pro Plan (Highlighted) -->
<div class="bg-white p-10 rounded-2xl border-2 border-primary shadow-2xl relative flex flex-col scale-105">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                Most Popular
                            </div>
<div class="mb-8">
<h3 class="text-lg font-bold text-primary uppercase tracking-widest mb-2">Pro</h3>
<div class="flex items-baseline gap-1">
<span class="text-4xl font-black text-slate-900">9.000</span>
<span class="text-slate-500 font-bold">CVE/mês</span>
</div>
<p class="text-slate-500 text-sm mt-4">A solução completa para agências em fase de crescimento rápido.</p>
</div>
<ul class="space-y-4 mb-10 flex-1">
<li class="flex items-center gap-3 text-slate-700 font-medium">
<span class="material-symbols-outlined text-success">check_circle</span> Tudo do plano Starter
                                </li>
<li class="flex items-center gap-3 text-slate-700 font-medium">
<span class="material-symbols-outlined text-success">check_circle</span> Automação WhatsApp Premium
                                </li>
<li class="flex items-center gap-3 text-slate-700 font-medium">
<span class="material-symbols-outlined text-success">check_circle</span> Analytics Avançado de Equipa
                                </li>
<li class="flex items-center gap-3 text-slate-700 font-medium">
<span class="material-symbols-outlined text-success">check_circle</span> Utilizadores Ilimitados
                                </li>
<li class="flex items-center gap-3 text-slate-700 font-medium">
<span class="material-symbols-outlined text-success">check_circle</span> Gestor de Conta Dedicado
                                </li>
</ul>
<button class="w-full py-4 px-6 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                                Começar com Pro
                            </button>
</div>
</div>
</div>
</section>
<!-- Final CTA Section -->
<section class="py-20 px-4 md:px-20 lg:px-40">
<div class="mx-auto max-w-7xl bg-primary rounded-[2rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
<!-- Background decor -->
<div class="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
<div class="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
<div class="relative z-10 space-y-8">
<h2 class="text-3xl font-black md:text-5xl leading-tight max-w-3xl mx-auto">
                            Pronto para levar a sua agência ao próximo nível?
                        </h2>
<p class="text-primary-100/80 text-lg max-w-2xl mx-auto">
                            Junte-se a dezenas de imobiliárias que já digitalizaram as suas operações em Cabo Verde.
                        </p>
<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
<button class="w-full sm:w-auto bg-white text-primary text-lg font-black px-10 py-5 rounded-2xl hover:bg-slate-50 transition-colors shadow-xl">
                                Solicitar Demonstração Gratuita
                            </button>
<button class="w-full sm:w-auto bg-primary/20 border border-white/30 text-white text-lg font-bold px-10 py-5 rounded-2xl hover:bg-primary/30 transition-colors">
                                Falar com Consultor
                            </button>
</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-slate-900 text-slate-400 py-12 px-4 md:px-20 lg:px-40">
<div class="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
<div class="col-span-1 md:col-span-2">
<div class="flex items-center gap-2 mb-6">
<div class="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
<span class="material-symbols-outlined text-xl">real_estate_agent</span>
</div>
<h2 class="text-xl font-black text-white">imo.cv <span class="text-slate-500 font-medium">CRM</span></h2>
</div>
<p class="max-w-xs text-sm leading-relaxed">
                        A plataforma tecnológica completa para o mercado imobiliário em Cabo Verde. Elevando os padrões do setor com inovação e confiança.
                    </p>
</div>
<div>
<h4 class="text-white font-bold mb-6">Produto</h4>
<ul class="space-y-4 text-sm">
<li><a class="hover:text-primary transition-colors" href="#">Funcionalidades</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Preços</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Novidades</a></li>
</ul>
</div>
<div>
<h4 class="text-white font-bold mb-6">Empresa</h4>
<ul class="space-y-4 text-sm">
<li><a class="hover:text-primary transition-colors" href="#">Sobre Nós</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Contacto</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Legal</a></li>
</ul>
</div>
</div>
<div class="mx-auto max-w-7xl pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
<p>© 2024 imo.cv CRM. Todos os direitos reservados.</p>
<div class="flex gap-6">
<a class="hover:text-white" href="#">LinkedIn</a>
<a class="hover:text-white" href="#">Facebook</a>
<a class="hover:text-white" href="#">Instagram</a>
</div>
</div>
</footer>
</div>
</body></html>

<!-- Condo Management Sales Page -->
<!DOCTYPE html>

<html lang="pt"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv | Gestão de Condomínios em Cabo Verde</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#10b77f",
              "atlantic": "#1E3A8A",
              "background-light": "#f6f8f7",
              "background-dark": "#10221c",
            },
            fontFamily: {
              "display": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
          },
        },
      }
    </script>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
<div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div class="layout-container flex h-full grow flex-col">
<!-- Top Navigation Bar -->
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-20 lg:px-40 py-4 sticky top-0 z-50">
<div class="flex items-center gap-2 text-primary">
<div class="size-8 bg-primary/10 rounded flex items-center justify-center">
<span class="material-symbols-outlined text-primary font-bold">domain</span>
</div>
<h2 class="text-atlantic dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">imo.cv</h2>
</div>
<div class="hidden md:flex flex-1 justify-end gap-8">
<nav class="flex items-center gap-9">
<a class="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#features">Funcionalidades</a>
<a class="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#pricing">Preços</a>
<a class="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#about">Sobre</a>
</nav>
<button class="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
<span>Começar Agora</span>
</button>
</div>
<div class="md:hidden">
<span class="material-symbols-outlined">menu</span>
</div>
</header>
<main class="flex-1">
<!-- Hero Section -->
<section class="px-6 md:px-20 lg:px-40 py-16 lg:py-24">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<div class="flex flex-col gap-8">
<div class="flex flex-col gap-4">
<span class="text-primary font-bold tracking-widest text-xs uppercase bg-primary/10 w-fit px-3 py-1 rounded-full">Líder em Cabo Verde</span>
<h1 class="text-atlantic dark:text-slate-100 text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                                    Gestão de Condomínios Transparente e Sem Stress
                                </h1>
<p class="text-slate-600 dark:text-slate-400 text-lg lg:text-xl leading-relaxed max-w-[500px]">
                                    Digitalize pagamentos e melhore a comunicação do seu prédio. Controle total e paz de espírito para administradores profissionais.
                                </p>
</div>
<div class="flex flex-col sm:flex-row gap-4">
<button class="flex min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                                    Modernizar o meu Condomínio
                                </button>
<button class="flex min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Ver Demonstração
                                </button>
</div>
<div class="flex items-center gap-4 text-slate-500 text-sm">
<div class="flex -space-x-2">
<div class="size-8 rounded-full border-2 border-white bg-slate-200 bg-cover" data-alt="Portrait of a building administrator" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqS3gfrfFWutS8QS-7s7I9LwSQ7J42RuU3HXkoSNCIOCQlUmdvMRXHDUQ8UW627zfKI7Z_cAe8QeEYaK7ite9zfI1h3hLO07jYzEkZnVU5yslfIs5Ef2IAViBCzYCxvvH_rOVHGIot6KPUon4sYRPojdgKVHeixGFxrDx_LLCRHhAuMjtnRA5z4O6mzP1lHkAxl-5_7P9AU9wW22fVvoD_bAaNdJhuMmXtL7k3aAFL3vTLSBMCnwuOQEEUjV-aI8ocFZ15KT7UODY')"></div>
<div class="size-8 rounded-full border-2 border-white bg-slate-300 bg-cover" data-alt="Satisfied condominium resident portrait" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDChMBOP1k4HGoYculY8i6SdAznZPQzQRKlRRawZW7OBf1CmrPvGFD4gHkTEhxx0aUSrYZzDQXfXdXNfg9bla3i7HcTad_hFcmOnVhIxVDiFuyeDGGVbJ_LkxLvoEVOhe6R3952zEglMuPIRW0MwCnygR2E4NFxb43rGxN4qlq_1KSfSLnvGfxGIIK7ISz0LGnpWCFt1VkEwgVF6l9HJBXbsJ9g_grLnXzLgp8qipM-pFqA95-W3bECT7ayrMtouvXM_s2sl-xTNxg')"></div>
<div class="size-8 rounded-full border-2 border-white bg-slate-400 bg-cover" data-alt="Professional property manager profile image" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4tlTy7NktesoTYzl9BI6bwB0MGkQh8-YxnMD7qsD7Je5YRMOABvrVAU_hg-qjoLGK6Oz-QzkfmkMfbd-S3aibsk55EwYYtL-q12Gzg97-zIhVESiFMthAl9L5sPCpYluVhkvqsQO_Lebun_6Zo45whwzGUUOWRgxiBaA_Cc8QwhhTVE-GRgaGvxeXbdALJuWPJRCy-BSS0zTAj44iEJKDdFMVICstgB3f7r7FQtDjm1eYMOIjTRgODqr-A09lNVDoSDhdNxxHdm4')"></div>
</div>
<span>+200 Administradores em Cabo Verde</span>
</div>
</div>
<div class="relative">
<div class="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl transform rotate-3"></div>
<div class="relative bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700">
<div class="w-full aspect-[4/3] bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col">
<!-- Simplified Dashboard UI -->
<div class="h-10 bg-white dark:bg-slate-800 border-b flex items-center px-4 gap-4">
<div class="size-3 rounded-full bg-red-400"></div>
<div class="size-3 rounded-full bg-yellow-400"></div>
<div class="size-3 rounded-full bg-green-400"></div>
<div class="h-4 w-32 bg-slate-100 dark:bg-slate-700 rounded ml-4"></div>
</div>
<div class="flex-1 p-6 grid grid-cols-3 gap-4">
<div class="col-span-2 space-y-4">
<div class="h-32 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-center">
<div class="w-4/5 h-20 bg-primary/10 rounded-lg relative overflow-hidden">
<div class="absolute bottom-0 left-0 w-full h-1/2 bg-primary/20"></div>
</div>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="h-20 bg-slate-50 dark:bg-slate-800 rounded-lg border"></div>
<div class="h-20 bg-slate-50 dark:bg-slate-800 rounded-lg border"></div>
</div>
</div>
<div class="col-span-1 bg-slate-50 dark:bg-slate-800 rounded-xl border p-4 space-y-3">
<div class="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
<div class="h-3 w-4/5 bg-slate-100 dark:bg-slate-700 rounded"></div>
<div class="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded"></div>
<div class="h-3 w-3/4 bg-slate-100 dark:bg-slate-700 rounded"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Pain Points Section -->
<section class="px-6 md:px-20 lg:px-40 py-20 bg-white dark:bg-background-dark/50">
<div class="text-center max-w-3xl mx-auto mb-16">
<h2 class="text-atlantic dark:text-slate-100 text-3xl font-bold mb-4">Resolva os problemas do seu prédio hoje</h2>
<p class="text-slate-500">Mude a forma como gere o seu património com ferramentas desenhadas para a realidade de Cabo Verde.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="group p-8 rounded-2xl bg-background-light dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
<div class="size-14 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-red-600">money_off</span>
</div>
<h3 class="text-xl font-bold mb-3">Fim da Inadimplência</h3>
<p class="text-slate-600 dark:text-slate-400 mb-6">Lembretes automáticos de pagamento via SMS e Email. Substitua cobranças manuais constrangedoras.</p>
<span class="text-primary font-semibold flex items-center gap-2">Ver solução <span class="material-symbols-outlined text-sm">arrow_forward</span></span>
</div>
<div class="group p-8 rounded-2xl bg-background-light dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
<div class="size-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-blue-600">forum</span>
</div>
<h3 class="text-xl font-bold mb-3">Comunicação Centralizada</h3>
<p class="text-slate-600 dark:text-slate-400 mb-6">Portal único para avisos e assembleias. Elimine o ruído e a informalidade dos grupos de WhatsApp.</p>
<span class="text-primary font-semibold flex items-center gap-2">Ver solução <span class="material-symbols-outlined text-sm">arrow_forward</span></span>
</div>
<div class="group p-8 rounded-2xl bg-background-light dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
<div class="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-primary">account_balance</span>
</div>
<h3 class="text-xl font-bold mb-3">Contabilidade Automática</h3>
<p class="text-slate-600 dark:text-slate-400 mb-6">Relatórios financeiros gerados instantaneamente sem erros. Abandone o Excel definitivamente.</p>
<span class="text-primary font-semibold flex items-center gap-2">Ver solução <span class="material-symbols-outlined text-sm">arrow_forward</span></span>
</div>
</div>
</section>
<!-- Features Section -->
<section class="px-6 md:px-20 lg:px-40 py-20" id="features">
<div class="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16">
<div class="max-w-2xl">
<h2 class="text-atlantic dark:text-slate-100 text-3xl lg:text-4xl font-black mb-4">Funcionalidades desenhadas para Cabo Verde</h2>
<p class="text-slate-600 dark:text-slate-400 text-lg">Tudo o que você precisa para uma gestão profissional, adaptada à moeda local (CVE) e às necessidades do mercado nacional.</p>
</div>
<button class="text-primary font-bold border-b-2 border-primary pb-1">Ver todas as funções</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div class="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
<span class="material-symbols-outlined text-3xl text-primary">receipt_long</span>
<h4 class="text-lg font-bold">Emissão de Faturas Automática</h4>
<p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Gere faturas mensais para todas as unidades com um clique em CVE, prontas para enviar por email.</p>
</div>
<div class="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
<span class="material-symbols-outlined text-3xl text-primary">how_to_vote</span>
<h4 class="text-lg font-bold">Votação Digital em Assembleias</h4>
<p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Colha votos de forma segura e transparente. Ideal para condóminos que vivem fora do país.</p>
</div>
<div class="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
<span class="material-symbols-outlined text-3xl text-primary">build_circle</span>
<h4 class="text-lg font-bold">Gestão de Manutenções</h4>
<p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Controle de fornecedores, orçamentos e histórico de obras preventivas do edifício.</p>
</div>
<div class="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
<span class="material-symbols-outlined text-3xl text-primary">account_tree</span>
<h4 class="text-lg font-bold">Reserva de Áreas Comuns</h4>
<p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Agenda online para salões de festas, piscinas e churrasqueiras, sem conflitos.</p>
</div>
<div class="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
<span class="material-symbols-outlined text-3xl text-primary">cloud_done</span>
<h4 class="text-lg font-bold">Arquivo Digital Seguro</h4>
<p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Documentos da assembleia e regulamento do condomínio acessíveis 24/7 a todos.</p>
</div>
<div class="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
<span class="material-symbols-outlined text-3xl text-primary">notifications_active</span>
<h4 class="text-lg font-bold">Alertas por SMS</h4>
<p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Comunique cortes de água ou avisos urgentes diretamente no telemóvel dos moradores.</p>
</div>
</div>
</section>
<!-- Pricing Section -->
<section class="px-6 md:px-20 lg:px-40 py-20 bg-atlantic text-white rounded-t-[3rem]" id="pricing">
<div class="text-center max-w-2xl mx-auto mb-16">
<h2 class="text-3xl lg:text-4xl font-bold mb-6">Investimento no seu património</h2>
<p class="text-blue-100/80">Escolha o plano que melhor se adapta ao tamanho e complexidade do seu condomínio.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
<!-- Basic Plan -->
<div class="bg-white text-slate-900 p-10 rounded-3xl flex flex-col gap-8 shadow-2xl">
<div>
<h3 class="text-2xl font-bold mb-2">Básico</h3>
<div class="flex items-baseline gap-1 mb-4">
<span class="text-4xl font-black">500</span>
<span class="text-slate-500 font-medium">CVE/unidade/mês</span>
</div>
<p class="text-slate-600">Ideal para pequenos prédios que procuram organizar a contabilidade.</p>
</div>
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span>Controlo de Pagamentos</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span>Gestão de Unidades</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span>Avisos por Email</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-slate-300">cancel</span>
<span class="text-slate-400">Votação Digital</span>
</div>
</div>
<button class="w-full h-12 bg-slate-100 hover:bg-slate-200 text-atlantic font-bold rounded-xl transition-colors">Selecionar Básico</button>
</div>
<!-- Premium Plan -->
<div class="bg-primary p-10 rounded-3xl flex flex-col gap-8 shadow-2xl relative overflow-hidden">
<div class="absolute top-6 right-[-35px] bg-yellow-400 text-atlantic text-xs font-bold py-1 px-10 transform rotate-45">POPULAR</div>
<div>
<h3 class="text-2xl font-bold mb-2">Premium</h3>
<div class="flex items-baseline gap-1 mb-4">
<span class="text-4xl font-black">800</span>
<span class="text-white/80 font-medium">CVE/unidade/mês</span>
</div>
<p class="text-white/90">Gestão completa para condomínios exigentes e administradores profissionais.</p>
</div>
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-white">check_circle</span>
<span>Tudo do plano Básico</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-white">check_circle</span>
<span>Votação Digital Segura</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-white">check_circle</span>
<span>Alertas SMS Ilimitados</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-white">check_circle</span>
<span>Gestão de Manutenções</span>
</div>
</div>
<button class="w-full h-12 bg-white text-primary font-bold rounded-xl shadow-xl hover:scale-[1.02] transition-transform">Selecionar Premium</button>
</div>
</div>
</section>
<!-- Final CTA -->
<section class="px-6 md:px-20 lg:px-40 py-24 text-center">
<div class="max-w-3xl mx-auto space-y-8">
<h2 class="text-atlantic dark:text-slate-100 text-4xl lg:text-5xl font-black leading-tight">Pronto para transformar a gestão do seu prédio?</h2>
<p class="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">Junte-se a centenas de administradores que já confiam na imo.cv para trazer paz e transparência aos seus condomínios.</p>
<div class="flex flex-col sm:flex-row justify-center gap-4 pt-4">
<button class="h-16 px-10 bg-primary text-white text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all">Começar Teste Grátis</button>
<button class="h-16 px-10 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-lg font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Falar com Especialista</button>
</div>
<p class="text-slate-400 text-sm italic">*Não requer cartão de crédito para testar.</p>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 md:px-20 lg:px-40 py-12">
<div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
<div class="col-span-1 md:col-span-1 space-y-6">
<div class="flex items-center gap-2 text-primary">
<span class="material-symbols-outlined text-primary font-bold">domain</span>
<h2 class="text-atlantic dark:text-slate-100 text-xl font-bold">imo.cv</h2>
</div>
<p class="text-slate-500 text-sm leading-relaxed">A plataforma líder em Cabo Verde para gestão inteligente de condomínios.</p>
<div class="flex gap-4">
<div class="size-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 cursor-pointer">
<span class="material-symbols-outlined text-sm">public</span>
</div>
<div class="size-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 cursor-pointer">
<span class="material-symbols-outlined text-sm">alternate_email</span>
</div>
</div>
</div>
<div class="space-y-4">
<h4 class="font-bold">Produto</h4>
<ul class="space-y-2 text-slate-500 text-sm">
<li class="hover:text-primary cursor-pointer transition-colors">Funcionalidades</li>
<li class="hover:text-primary cursor-pointer transition-colors">Segurança</li>
<li class="hover:text-primary cursor-pointer transition-colors">Preços</li>
<li class="hover:text-primary cursor-pointer transition-colors">Roadmap</li>
</ul>
</div>
<div class="space-y-4">
<h4 class="font-bold">Empresa</h4>
<ul class="space-y-2 text-slate-500 text-sm">
<li class="hover:text-primary cursor-pointer transition-colors">Sobre Nós</li>
<li class="hover:text-primary cursor-pointer transition-colors">Blog</li>
<li class="hover:text-primary cursor-pointer transition-colors">Contacto</li>
<li class="hover:text-primary cursor-pointer transition-colors">Parcerias</li>
</ul>
</div>
<div class="space-y-4">
<h4 class="font-bold">Suporte</h4>
<ul class="space-y-2 text-slate-500 text-sm">
<li class="hover:text-primary cursor-pointer transition-colors">Centro de Ajuda</li>
<li class="hover:text-primary cursor-pointer transition-colors">Termos de Serviço</li>
<li class="hover:text-primary cursor-pointer transition-colors">Privacidade</li>
<li class="hover:text-primary cursor-pointer transition-colors">Estado do Serviço</li>
</ul>
</div>
</div>
<div class="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="text-slate-400 text-xs">© 2024 imo.cv Gestão de Condomínios. Desenvolvido para Cabo Verde.</p>
<div class="flex gap-6">
<img alt="Vinti4 payment logo" class="grayscale opacity-50" data-alt="Vinti4 payment network logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYUyn_bcDzstyZBi5S000nTxTdpb5F1n8txMABnCIEQANWtybP8IPZaBdg551BCDUKnL34DQj4zGsvmxtl8ckqE9sIbZLqp1uePgfhoRabWb2MB_RBgWQ8s8gSW6k3LWSdbr9Bq0yXjQRIKliRYOwUfJhOxgv9nVQ09OOgrG-TwtfT6VbmWspGdFfMPi5atF4zYSYX5NnSP78VCxnppiBxZXcNehxJbzGY8X3U1lmmSHydUyVr2WdrgyTCRnWC9cZlar_OWQqUA64"/>
<img alt="Visa payment logo" class="grayscale opacity-50" data-alt="Visa payment network logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYh8qL6v4z8RxwY5SFrNZz2zFgffJsjJeF_3lCPy4jGQQu2gBKFYxdLLlV13WuyOHvxV6vAknEc12Tn209WvXbMpb5jdV0lMi_InbF7b0qNtsyEf92bxZII4rfODaeZjOAiQ0BBrX_4w4hBKuAjPgXl65-eEv4bs-9CdHE4Eo5Toc1nU7TOcXwxJJxfKqcK_vAdlPqlerI3CYd2JpMo-UZF9xgrDq7MEEtEoYilMJog5a4qW9jeApKmnPl_IzuPPCdKENorLlEZVw"/>
<img alt="Mastercard payment logo" class="grayscale opacity-50" data-alt="Mastercard payment network logo icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBzWJoYUzhtl7PFUTJlrwPr9sqWaDk4QeopCb58LUim3BrBHbMEXrNsr4lShilU5uDeeFN2QqfiAjMl-bLy6V9iyRnGAsomIWnjsyKdiOi7Vhu9n4FaI7KiILGZWK6v3zXseZJDNlDbk3gU-jViNIXlVlr8RXo8YMOUoVlNc8_Iy0CXSLH6RF9awWhJTJFB5a8YIrgMWRgVotAeQRQgV6SosOC1-dBc7zHQeaC3U8Opo5irdO4Ih3m53oSKxbJB8Ni2lu1Ic20b3Q"/>
</div>
</div>
</footer>
</div>
</div>
</body></html>

<!-- Market Intelligence Sales Page -->
<!DOCTYPE html>

<html lang="pt"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv Market Intelligence | Dados Reais do Mercado Imobiliário</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#1e3b8a",
                        "accent": "#f59e0b",
                        "background-light": "#f6f6f8",
                        "background-dark": "#121620",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        .heatmap-gradient {
            background: radial-gradient(circle at 30% 40%, rgba(245, 158, 11, 0.4) 0%, transparent 40%),
                        radial-gradient(circle at 70% 60%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
                        rgba(30, 59, 138, 0.05);
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
<!-- Top Navigation -->
<header class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex h-16 items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">insights</span>
<span class="text-xl font-black tracking-tight text-primary">imo.cv <span class="font-normal text-slate-500">Intelligence</span></span>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#solucoes">Soluções</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#dados">Dados</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#precos">Preços</a>
<button class="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition-all">Pedir Acesso</button>
<button class="text-slate-600 dark:text-slate-400 text-sm font-bold hover:text-primary">Login</button>
</nav>
<div class="md:hidden">
<span class="material-symbols-outlined">menu</span>
</div>
</div>
</div>
</header>
<main>
<!-- Hero Section -->
<section class="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 border-b border-slate-200 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid lg:grid-cols-2 gap-12 items-center">
<div class="relative z-10">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
<span class="material-symbols-outlined text-sm">verified_user</span>
                            Dados Oficiais e Atualizados
                        </div>
<h1 class="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6">
                            Decisões Inteligentes baseadas em <span class="text-primary">Dados Reais</span> do Mercado de Cabo Verde
                        </h1>
<p class="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
                            Reduza o risco e maximize o retorno do seu investimento imobiliário com a plataforma de inteligência de dados mais precisa do arquipélago.
                        </p>
<div class="flex flex-col sm:flex-row gap-4">
<button class="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
                                Aceder aos Dados Agora
                                <span class="material-symbols-outlined">arrow_forward</span>
</button>
<button class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                                Agendar Demo
                            </button>
</div>
</div>
<div class="relative">
<!-- Financial Interface Placeholder -->
<div class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl p-4 @container overflow-hidden">
<div class="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
<div class="flex gap-2">
<div class="w-3 h-3 rounded-full bg-red-400"></div>
<div class="w-3 h-3 rounded-full bg-yellow-400"></div>
<div class="w-3 h-3 rounded-full bg-green-400"></div>
</div>
<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Market Dashboard</div>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="h-32 rounded-lg bg-slate-50 dark:bg-slate-800 p-3 flex flex-col justify-between">
<span class="text-[10px] font-bold text-slate-500 uppercase">Avg. Price m² Praia</span>
<div class="text-2xl font-black text-primary">145.000 <span class="text-xs font-normal">CVE</span></div>
<div class="text-xs font-bold text-green-500 flex items-center gap-1">
<span class="material-symbols-outlined text-sm">trending_up</span> +12.4%
                                    </div>
</div>
<div class="h-32 rounded-lg bg-slate-50 dark:border-slate-800 p-3 flex flex-col justify-between">
<span class="text-[10px] font-bold text-slate-500 uppercase">Yield Médio</span>
<div class="text-2xl font-black text-accent">8.2%</div>
<div class="text-xs font-bold text-slate-400">Histórico 12 meses</div>
</div>
<div class="col-span-2 h-48 rounded-lg bg-slate-50 dark:bg-slate-800 p-3 relative overflow-hidden">
<div class="absolute inset-0 opacity-20 bg-[radial-gradient(#1e3b8a_1px,transparent_1px)] [background-size:16px_16px]"></div>
<div class="flex justify-between items-end h-full px-4 gap-2">
<div class="w-full bg-primary/20 h-1/2 rounded-t"></div>
<div class="w-full bg-primary/30 h-2/3 rounded-t"></div>
<div class="w-full bg-primary/40 h-1/3 rounded-t"></div>
<div class="w-full bg-primary/50 h-3/4 rounded-t"></div>
<div class="w-full bg-primary/60 h-2/3 rounded-t"></div>
<div class="w-full bg-primary h-full rounded-t"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Decorative background elements -->
<div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 blur-3xl rounded-full"></div>
<div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 blur-3xl rounded-full"></div>
</section>
<!-- Solutions Section -->
<section class="py-24 bg-white dark:bg-background-dark" id="solucoes">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="text-center mb-16">
<h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Soluções Estratégicas para Investidores</h2>
<p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Transformamos dados complexos em insights acionáveis para o seu próximo empreendimento.</p>
</div>
<div class="grid md:grid-cols-3 gap-8">
<!-- ROI Card -->
<div class="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-primary/30 transition-all group">
<div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
<span class="material-symbols-outlined">analytics</span>
</div>
<h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Análise de ROI</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Calcule o potencial de retorno dos seus projetos com precisão matemática, considerando taxas de ocupação e valorização real.</p>
</div>
<!-- Prices Card -->
<div class="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-primary/30 transition-all group">
<div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
<span class="material-symbols-outlined">map</span>
</div>
<h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Índice de Preços por Ilha</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Acesso a dados comparativos detalhados de todas as ilhas, identificando disparidades e oportunidades de arbitragem geográfica.</p>
</div>
<!-- Trends Card -->
<div class="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-primary/30 transition-all group">
<div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
<span class="material-symbols-outlined">trending_up</span>
</div>
<h3 class="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Tendências de Procura</h3>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed">Entenda o que os compradores nacionais e internacionais estão à procura em tempo real através de padrões de busca refinados.</p>
</div>
</div>
</div>
</section>
<!-- Data Preview Section -->
<section class="py-24 bg-background-light dark:bg-background-dark" id="dados">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid lg:grid-cols-2 gap-16 items-center">
<div>
<h2 class="text-3xl font-black mb-6 tracking-tight">Visualize a Força dos Nossos Dados</h2>
<p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Nossa tecnologia processa milhares de transações e listagens diariamente para oferecer uma visão microscópica do mercado.
                        </p>
<ul class="space-y-4">
<li class="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300">
<span class="material-symbols-outlined text-accent">check_circle</span>
                                Mapas de calor de densidade de preços
                            </li>
<li class="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300">
<span class="material-symbols-outlined text-accent">check_circle</span>
                                Séries temporais de valorização (24+ meses)
                            </li>
<li class="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300">
<span class="material-symbols-outlined text-accent">check_circle</span>
                                Filtros avançados por tipologia e bairro
                            </li>
</ul>
</div>
<div class="grid grid-cols-1 gap-6">
<!-- Heatmap Mockup -->
<div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-xl">
<div class="flex justify-between items-center mb-6">
<h4 class="font-bold text-sm">Heatmap de Preços: Praia</h4>
<span class="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold uppercase tracking-wider">Altos Padrões</span>
</div>
<div class="aspect-video heatmap-gradient rounded-lg border border-slate-100 dark:border-slate-800 relative overflow-hidden flex items-center justify-center" data-location="Praia, Cabo Verde" style="">
<div class="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-20">
<!-- Grid lines for map look -->
<div class="border-r border-b border-slate-300 dark:border-slate-600 col-span-12 row-span-8"></div>
</div>
<div class="text-primary text-xs font-bold bg-white/90 px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
<span class="material-symbols-outlined text-sm">location_on</span> Palmarejo Baixo
                                </div>
</div>
</div>
<!-- Line Chart Mockup -->
<div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-xl">
<div class="flex justify-between items-center mb-6">
<h4 class="font-bold text-sm">Valorização de Propriedades (24 Meses)</h4>
<div class="flex gap-2">
<div class="w-2 h-2 rounded-full bg-primary"></div>
<div class="w-2 h-2 rounded-full bg-accent"></div>
</div>
</div>
<div class="h-32 flex items-end gap-1">
<div class="flex-1 bg-primary/10 rounded-t h-[40%]"></div>
<div class="flex-1 bg-primary/15 rounded-t h-[45%]"></div>
<div class="flex-1 bg-primary/20 rounded-t h-[42%]"></div>
<div class="flex-1 bg-primary/25 rounded-t h-[50%]"></div>
<div class="flex-1 bg-primary/30 rounded-t h-[55%]"></div>
<div class="flex-1 bg-primary/35 rounded-t h-[52%]"></div>
<div class="flex-1 bg-primary/40 rounded-t h-[60%]"></div>
<div class="flex-1 bg-primary/45 rounded-t h-[65%]"></div>
<div class="flex-1 bg-primary/50 rounded-t h-[70%]"></div>
<div class="flex-1 bg-primary/60 rounded-t h-[75%]"></div>
<div class="flex-1 bg-primary/80 rounded-t h-[85%]"></div>
<div class="flex-1 bg-primary rounded-t h-[100%]"></div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Pricing Section -->
<section class="py-24 bg-white dark:bg-background-dark" id="precos">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="text-center mb-16">
<h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">Planos de Acesso</h2>
<p class="text-slate-600 dark:text-slate-400">Escolha a profundidade de dados que o seu negócio exige.</p>
</div>
<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
<!-- Essential Plan -->
<div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col bg-slate-50/30 dark:bg-slate-900/30">
<h3 class="text-xl font-bold mb-2">Essential</h3>
<p class="text-slate-500 text-sm mb-6">Para investidores individuais e pequenos gestores.</p>
<div class="mb-8">
<span class="text-4xl font-black">10.000</span>
<span class="text-slate-500 font-semibold">CVE/mês</span>
</div>
<ul class="space-y-4 mb-10 flex-grow">
<li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-primary text-lg">check</span>
                                Acesso a Dashboard de Preços
                            </li>
<li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-primary text-lg">check</span>
                                Mapas de Calor Básicos
                            </li>
<li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-primary text-lg">check</span>
                                1 Relatório mensal em PDF
                            </li>
</ul>
<button class="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">Começar Agora</button>
</div>
<!-- Professional Plan -->
<div class="rounded-2xl border-2 border-primary p-8 flex flex-col relative bg-white dark:bg-slate-900 shadow-2xl scale-105">
<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest">
                            Mais Popular
                        </div>
<h3 class="text-xl font-bold mb-2">Professional</h3>
<p class="text-slate-500 text-sm mb-6">Para promotores imobiliários e grandes imobiliárias.</p>
<div class="mb-8">
<span class="text-4xl font-black">25.000</span>
<span class="text-slate-500 font-semibold">CVE/mês</span>
</div>
<ul class="space-y-4 mb-10 flex-grow">
<li class="flex items-center gap-3 text-sm font-semibold">
<span class="material-symbols-outlined text-accent text-lg">check_circle</span>
                                Tudo no plano Essential
                            </li>
<li class="flex items-center gap-3 text-sm font-semibold">
<span class="material-symbols-outlined text-accent text-lg">check_circle</span>
                                Acesso Completo à API
                            </li>
<li class="flex items-center gap-3 text-sm font-semibold">
<span class="material-symbols-outlined text-accent text-lg">check_circle</span>
                                Relatórios Customizados Ilimitados
                            </li>
<li class="flex items-center gap-3 text-sm font-semibold">
<span class="material-symbols-outlined text-accent text-lg">check_circle</span>
                                Suporte Prioritário 24/7
                            </li>
</ul>
<button class="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-blue-800 transition-all shadow-lg shadow-primary/20">Aderir ao Professional</button>
</div>
</div>
</div>
</section>
<!-- Trust & Credibility -->
<section class="py-24 bg-primary text-white overflow-hidden relative">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
<div class="flex justify-center mb-8">
<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
<span class="material-symbols-outlined text-accent">verified</span>
<span class="text-sm font-bold uppercase tracking-widest">Fonte de Dados Verificada</span>
</div>
</div>
<blockquote class="max-w-3xl mx-auto mb-12">
<p class="text-2xl lg:text-3xl font-medium leading-relaxed italic mb-8">
                        "O imo.cv Market Intelligence mudou completamente a forma como avaliamos novos terrenos. Agora, as nossas propostas são baseadas em fatos, não em intuição. O ROI dos nossos últimos projetos subiu 15% graças a estes dados."
                    </p>
<footer class="flex items-center justify-center gap-4">
<div class="w-16 h-16 rounded-full bg-slate-200 border-4 border-white/20 overflow-hidden" data-alt="Portrait of a professional business executive" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxGg7r8yZuD2WqitslVfFAANwQ9DY_pl5s9ansrz7t3spquOfCt1Mj2kZU5c0f7Os36ENacqTXNVtr1GFvIQJ0sFrdJC4VVsm4ib6FRmRAZc8TfH4h0e03b-vSuyj4gjYwzyhNmH518hfuF1ejVfmR1mVvtdWjYTARrbwlB6Ka1RhX0hxgttdGYCX8tzBK7XLeVX9fqXk4CFeVxxY2vprLM-unblUuK55tNdkCUQ62WRRGLDCC70zb1LwMbWwEeVyyT_zGICQamew')"></div>
<div class="text-left">
<div class="font-bold text-lg">Eng. Carlos Silva</div>
<div class="text-primary-200 text-sm opacity-80 text-white/70">CEO, Cabo Verde Developers Group</div>
</div>
</footer>
</blockquote>
</div>
<!-- Pattern background -->
<div class="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
</section>
<!-- Final CTA -->
<section class="py-20 text-center">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<h2 class="text-3xl font-black mb-6">Pronto para liderar o mercado?</h2>
<p class="text-slate-600 dark:text-slate-400 mb-10 text-lg">Não deixe o seu investimento ao acaso. Use a inteligência ao seu favor.</p>
<button class="bg-primary text-white px-10 py-5 rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                    Aceder aos Dados Agora
                </button>
</div>
</section>
</main>
<footer class="bg-slate-50 dark:bg-slate-900 py-12 border-t border-slate-200 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex flex-col md:flex-row justify-between items-center gap-8">
<div class="flex items-center gap-2 opacity-50">
<span class="material-symbols-outlined text-2xl">insights</span>
<span class="text-lg font-black tracking-tight">imo.cv Intelligence</span>
</div>
<div class="flex gap-8 text-sm text-slate-500 font-medium">
<a class="hover:text-primary transition-colors" href="#">Privacidade</a>
<a class="hover:text-primary transition-colors" href="#">Termos de Uso</a>
<a class="hover:text-primary transition-colors" href="#">Contato</a>
</div>
<div class="text-sm text-slate-400">
                    © 2024 imo.cv. Todos os direitos reservados.
                </div>
</div>
</div>
</footer>
</body></html>

<!-- Market Intelligence Dashboard -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Market Intelligence Dashboard | imo.cv</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#1e3b8a",
                        "opportunity": "#f59e0b",
                        "background-light": "#f6f6f8",
                        "background-dark": "#0f172a",
                        "surface-dark": "#1e293b",
                        "border-dark": "#334155",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Manrope', sans-serif;
        }
        .heatmap-overlay {
            background: radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.4) 0%, transparent 40%),
                        radial-gradient(circle at 70% 60%, rgba(239, 68, 68, 0.3) 0%, transparent 35%),
                        radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.2) 0%, transparent 50%);
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden">
<div class="flex h-screen overflow-hidden">
<!-- Sidebar Navigation -->
<aside class="w-64 flex-shrink-0 bg-background-light dark:bg-background-dark border-r border-slate-200 dark:border-border-dark flex flex-col">
<div class="p-6 flex items-center gap-3">
<div class="size-8 bg-primary rounded flex items-center justify-center text-white">
<span class="material-symbols-outlined">analytics</span>
</div>
<h1 class="text-xl font-extrabold tracking-tight">imo.cv</h1>
</div>
<nav class="flex-1 px-4 space-y-2 mt-4">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary dark:text-blue-400 font-semibold transition-all" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="text-sm">Market Overview</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all" href="#">
<span class="material-symbols-outlined">explore</span>
<span class="text-sm">Island Deep-dive</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark dark:text-slate-400 transition-all" href="#">
<span class="material-symbols-outlined">calculate</span>
<span class="text-sm">ROI Calculator</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-surface-dark dark:text-slate-400 transition-all" href="#">
<span class="material-symbols-outlined">description</span>
<span class="text-sm">My Reports</span>
</a>
</nav>
<div class="p-4 mt-auto">
<div class="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 mb-4 border border-primary/10">
<p class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest mb-1">PRO PLAN</p>
<p class="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">Unlock advanced island analytics and export features.</p>
<button class="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 rounded-lg transition-colors">Upgrade Now</button>
</div>
<div class="flex items-center gap-3 px-3 py-2">
<div class="size-8 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
<img class="w-full h-full object-cover" data-alt="User avatar placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIn2R0K3HabGcL_BPFvGsOXOROc8q0TydIuhaJy4INxmpjM5MxBzrKsra2l8G2zeHs6dHAM9h4PfBgFOQnOtz8vQM5pclvw-BQ8H-6fiHgYvAfzHxr6Hv5GGjAVGYqGZoFB8hDsr8T5KumPGnyUnWlhZJEJepmFn5zzJvhPLsbp8k99yb6b4umjzSfAVnnoKIapVIuClym75yJNzdZRJsrsPranorP7M4cAfzt2LTw4oTl1UeNahdv0mBEQ-myS5diuHQn15SpiUA"/>
</div>
<div class="flex-1 overflow-hidden">
<p class="text-sm font-bold truncate">Investor Alpha</p>
<p class="text-xs text-slate-500 truncate">Premium Member</p>
</div>
<span class="material-symbols-outlined text-slate-400 cursor-pointer">settings</span>
</div>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col min-w-0 overflow-hidden">
<!-- Header -->
<header class="h-16 flex items-center justify-between px-8 bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-border-dark">
<div class="flex items-center flex-1 max-w-xl">
<div class="relative w-full">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-surface-dark border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100 transition-all" placeholder="Search islands, zones or developers..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<div class="flex bg-slate-100 dark:bg-surface-dark p-1 rounded-lg">
<button class="px-4 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-primary text-slate-900 dark:text-white shadow-sm">Last 12 Months</button>
<button class="px-4 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">All Time</button>
</div>
<button class="size-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-surface-dark text-slate-600 dark:text-slate-300">
<span class="material-symbols-outlined">notifications</span>
</button>
</div>
</header>
<!-- Dashboard Scrollable Section -->
<div class="flex-1 overflow-y-auto p-8 space-y-8">
<!-- KPI Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<div class="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
<div class="flex justify-between items-start mb-4">
<span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Price/m² (Santiago)</span>
<span class="text-emerald-500 flex items-center text-xs font-bold">
<span class="material-symbols-outlined text-sm">trending_up</span> 4.2%
                            </span>
</div>
<h3 class="text-3xl font-extrabold tracking-tight">€1,240</h3>
<div class="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
<div class="h-full bg-primary w-2/3"></div>
</div>
</div>
<div class="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
<div class="flex justify-between items-start mb-4">
<span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">YoY Growth Rate</span>
<span class="text-emerald-500 flex items-center text-xs font-bold">
<span class="material-symbols-outlined text-sm">trending_up</span> 1.2%
                            </span>
</div>
<h3 class="text-3xl font-extrabold tracking-tight">8.5%</h3>
<div class="mt-4 flex gap-1 items-end h-6">
<div class="w-1 bg-primary/20 h-2 rounded-t"></div>
<div class="w-1 bg-primary/20 h-4 rounded-t"></div>
<div class="w-1 bg-primary/20 h-3 rounded-t"></div>
<div class="w-1 bg-primary/40 h-5 rounded-t"></div>
<div class="w-1 bg-primary/60 h-6 rounded-t"></div>
<div class="w-1 bg-primary h-5 rounded-t"></div>
</div>
</div>
<div class="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
<div class="flex justify-between items-start mb-4">
<span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Demand Heat (Sal)</span>
<span class="text-slate-400 flex items-center text-xs font-bold italic">Stable</span>
</div>
<h3 class="text-3xl font-extrabold tracking-tight text-red-500">High</h3>
<div class="mt-4 flex justify-between text-[10px] text-slate-500 font-bold uppercase">
<span>Low</span><span>Mid</span><span class="text-primary dark:text-blue-400">High</span>
</div>
</div>
<div class="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
<div class="flex justify-between items-start mb-4">
<span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">New Developments</span>
<span class="text-emerald-500 flex items-center text-xs font-bold">+2</span>
</div>
<h3 class="text-3xl font-extrabold tracking-tight">12 <span class="text-sm font-medium text-slate-500">Active</span></h3>
<div class="mt-4 flex -space-x-2">
<div class="size-6 rounded-full border-2 border-white dark:border-surface-dark bg-slate-200"></div>
<div class="size-6 rounded-full border-2 border-white dark:border-surface-dark bg-slate-300"></div>
<div class="size-6 rounded-full border-2 border-white dark:border-surface-dark bg-slate-400"></div>
<div class="size-6 flex items-center justify-center rounded-full border-2 border-white dark:border-surface-dark bg-primary text-[8px] text-white font-bold">+9</div>
</div>
</div>
</div>
<!-- Main Data Visualizations -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- Price Trends Comparison Chart -->
<div class="lg:col-span-2 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
<div class="flex items-center justify-between mb-8">
<div>
<h4 class="text-lg font-bold">Price Trends Comparison</h4>
<p class="text-sm text-slate-500 dark:text-slate-400">Historical performance across major islands</p>
</div>
<div class="flex gap-4">
<div class="flex items-center gap-1.5">
<div class="size-2 rounded-full bg-primary"></div>
<span class="text-xs font-medium text-slate-500">Santiago</span>
</div>
<div class="flex items-center gap-1.5">
<div class="size-2 rounded-full bg-blue-400"></div>
<span class="text-xs font-medium text-slate-500">Sal</span>
</div>
<div class="flex items-center gap-1.5">
<div class="size-2 rounded-full bg-emerald-400"></div>
<span class="text-xs font-medium text-slate-500">Boa Vista</span>
</div>
</div>
</div>
<div class="h-64 relative">
<!-- Simplified Chart Representation -->
<svg class="w-full h-full overflow-visible" preserveaspectratio="none" viewbox="0 0 800 200">
<!-- Grid Lines -->
<line class="text-slate-100 dark:text-slate-800" stroke="currentColor" stroke-width="1" x1="0" x2="800" y1="0" y2="0"></line>
<line class="text-slate-100 dark:text-slate-800" stroke="currentColor" stroke-width="1" x1="0" x2="800" y1="50" y2="50"></line>
<line class="text-slate-100 dark:text-slate-800" stroke="currentColor" stroke-width="1" x1="0" x2="800" y1="100" y2="100"></line>
<line class="text-slate-100 dark:text-slate-800" stroke="currentColor" stroke-width="1" x1="0" x2="800" y1="150" y2="150"></line>
<line class="text-slate-100 dark:text-slate-800" stroke="currentColor" stroke-width="1" x1="0" x2="800" y1="200" y2="200"></line>
<!-- Data Lines -->
<path d="M0,150 Q100,130 200,140 T400,100 T600,80 T800,60" fill="none" stroke="#1e3b8a" stroke-width="3"></path>
<path d="M0,180 Q150,160 300,170 T500,120 T700,90 T800,40" fill="none" stroke="#60a5fa" stroke-dasharray="4" stroke-width="2"></path>
<path d="M0,120 Q100,110 200,130 T400,140 T600,110 T800,90" fill="none" stroke="#34d399" stroke-width="2"></path>
</svg>
<div class="flex justify-between mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
<span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
</div>
</div>
</div>
<!-- Property Type Distribution Donut -->
<div class="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark p-6 shadow-sm">
<h4 class="text-lg font-bold mb-1">Property Distribution</h4>
<p class="text-sm text-slate-500 dark:text-slate-400 mb-8">Asset class allocation</p>
<div class="relative size-48 mx-auto mb-8">
<svg class="size-full transform -rotate-90" viewbox="0 0 100 100">
<circle class="text-slate-100 dark:text-slate-800" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" stroke-width="12"></circle>
<circle cx="50" cy="50" fill="transparent" r="40" stroke="#1e3b8a" stroke-dasharray="138 251" stroke-width="12"></circle>
<circle cx="50" cy="50" fill="transparent" r="40" stroke="#60a5fa" stroke-dasharray="75 251" stroke-dashoffset="-138" stroke-width="12"></circle>
<circle cx="50" cy="50" fill="transparent" r="40" stroke="#34d399" stroke-dasharray="38 251" stroke-dashoffset="-213" stroke-width="12"></circle>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center">
<span class="text-2xl font-extrabold tracking-tight">2,410</span>
<span class="text-[10px] font-bold text-slate-500 uppercase">Total units</span>
</div>
</div>
<div class="space-y-3">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<div class="size-3 rounded-full bg-primary"></div>
<span class="text-sm font-medium">Apartments</span>
</div>
<span class="text-sm font-bold">55%</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<div class="size-3 rounded-full bg-blue-400"></div>
<span class="text-sm font-medium">Houses</span>
</div>
<span class="text-sm font-bold">30%</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<div class="size-3 rounded-full bg-emerald-400"></div>
<span class="text-sm font-medium">Land Plots</span>
</div>
<span class="text-sm font-bold">15%</span>
</div>
</div>
</div>
</div>
<!-- Heatmap and Insights Row -->
<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
<!-- Demand Heatmap Section -->
<div class="lg:col-span-3 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm flex flex-col">
<div class="p-6 border-b border-slate-200 dark:border-border-dark flex items-center justify-between">
<div>
<h4 class="text-lg font-bold">Demand Density Heatmap: Praia</h4>
<p class="text-sm text-slate-500 dark:text-slate-400">Search volume and buyer intent localized by neighborhood</p>
</div>
<div class="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-[10px] font-bold">
<button class="px-3 py-1 rounded bg-white dark:bg-surface-dark shadow-sm">Sales</button>
<button class="px-3 py-1 text-slate-500">Rentals</button>
</div>
</div>
<div class="flex-1 min-h-[400px] relative bg-slate-200 dark:bg-slate-900 overflow-hidden group">
<!-- Map Placeholder -->
<img class="w-full h-full object-cover opacity-30 dark:opacity-20" data-alt="Simplified map of Praia neighborhood layout" data-location="Praia, Cape Verde" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBakl7_uZMCDWvKIfFsR3fzEHfPPEIKS1smVroB9lRa0Do_h1Z2LN7S4qeEdEtW9gYl0Qx9cBzJQ7af_V7g77clcBkf0fF7mP7u5LtdJNWdQw3CTNLTZGvMhvpp-aRum7o1u7dg2TKh32Y2JVdDCP4V9npr6hPSNykm68HdSHkNHdABjsy22OLPG9gWXdBCI8jKvwjdDHeHn5b-ulkQtaDCtb4UlGLLOhujrtZzUS9tMPYbvUi4U55lF9RCEWQjUuoZ6-0YW3eE-2M"/>
<!-- Heatmap Layer -->
<div class="absolute inset-0 heatmap-overlay pointer-events-none"></div>
<!-- Heatmap Markers -->
<div class="absolute top-1/3 left-1/4 size-24 rounded-full bg-red-500/20 animate-pulse border border-red-500/30 flex items-center justify-center">
<div class="size-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
<div class="absolute top-8 left-8 bg-white dark:bg-surface-dark px-2 py-1 rounded text-[10px] font-bold shadow-xl border border-slate-200 dark:border-border-dark">Palmarejo</div>
</div>
<div class="absolute bottom-1/4 right-1/3 size-20 rounded-full bg-primary/20 animate-pulse border border-primary/30 flex items-center justify-center">
<div class="size-4 bg-primary rounded-full shadow-[0_0_15px_rgba(30,58,138,0.8)]"></div>
<div class="absolute top-8 left-8 bg-white dark:bg-surface-dark px-2 py-1 rounded text-[10px] font-bold shadow-xl border border-slate-200 dark:border-border-dark">Plateau</div>
</div>
<!-- Map Legend -->
<div class="absolute bottom-6 right-6 bg-white dark:bg-surface-dark/90 backdrop-blur-md p-3 rounded-lg border border-slate-200 dark:border-border-dark shadow-xl">
<p class="text-[10px] font-bold text-slate-500 uppercase mb-2">Demand Level</p>
<div class="flex items-center gap-3">
<div class="h-2 w-32 rounded-full bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600"></div>
<div class="flex justify-between w-full text-[9px] font-bold text-slate-400">
<span>LOW</span><span>HIGH</span>
</div>
</div>
</div>
</div>
</div>
<!-- AI Insights Feed -->
<div class="flex flex-col gap-4">
<div class="flex items-center gap-2 px-1">
<span class="material-symbols-outlined text-opportunity">auto_awesome</span>
<h4 class="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">AI Opportunities</h4>
</div>
<div class="space-y-4">
<!-- Opportunity Card 1 -->
<div class="bg-white dark:bg-surface-dark border-l-4 border-opportunity p-4 rounded-r-xl shadow-sm border-y border-r border-slate-200 dark:border-border-dark hover:translate-x-1 transition-transform cursor-pointer group">
<div class="flex justify-between mb-2">
<span class="text-[10px] font-extrabold text-opportunity uppercase tracking-wider">Yield Alert</span>
<span class="text-[10px] text-slate-400 font-medium">2h ago</span>
</div>
<p class="text-sm font-bold leading-snug mb-2 group-hover:text-opportunity transition-colors">Rising demand detected in Palmarejo Baixo</p>
<p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">Search queries for 2-bedroom rentals increased by 22% this week. Estimated yield premium: +1.5%.</p>
<div class="mt-3 flex items-center justify-between">
<span class="text-[10px] font-bold text-emerald-500">Recommended Action</span>
<span class="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
</div>
</div>
<!-- Opportunity Card 2 -->
<div class="bg-white dark:bg-surface-dark border-l-4 border-primary p-4 rounded-r-xl shadow-sm border-y border-r border-slate-200 dark:border-border-dark hover:translate-x-1 transition-transform cursor-pointer group">
<div class="flex justify-between mb-2">
<span class="text-[10px] font-extrabold text-primary dark:text-blue-400 uppercase tracking-wider">Inventory Low</span>
<span class="text-[10px] text-slate-400 font-medium">5h ago</span>
</div>
<p class="text-sm font-bold leading-snug mb-2 group-hover:text-primary transition-colors">Supply Shortage: Santa Maria (Sal)</p>
<p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">Available land plots for commercial development have reached a 3-year low. Buy signal high.</p>
<div class="mt-3 flex items-center justify-between">
<span class="text-[10px] font-bold text-primary dark:text-blue-400">Market Insight</span>
<span class="material-symbols-outlined text-sm text-slate-400">chevron_right</span>
</div>
</div>
<!-- Opportunity Card 3 -->
<div class="bg-white dark:bg-surface-dark border-l-4 border-slate-400 p-4 rounded-r-xl shadow-sm border-y border-r border-slate-200 dark:border-border-dark opacity-80">
<div class="flex justify-between mb-2">
<span class="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Trend Shift</span>
<span class="text-[10px] text-slate-400 font-medium">1d ago</span>
</div>
<p class="text-sm font-bold leading-snug mb-2">Shift towards eco-tourism in Boa Vista</p>
<p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Sustainable construction permits are receiving faster approvals in northern coastal zones.</p>
</div>
<button class="w-full py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                View All Market Signals
                            </button>
</div>
</div>
</div>
</div>
</main>
</div>
</body></html>

<!-- Market Intelligence: Data-First Variant -->
<!DOCTYPE html>

<html class="dark" lang="pt"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv Market Intelligence | Data-First Variant</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#2b9dee",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101a22",
                        "slate-panel": "#1a2632",
                        "slate-border": "#2d3d4d"
                    },
                    fontFamily: {
                        "display": ["Space Grotesk", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Space Grotesk', sans-serif;
        }
        .data-grid-bg {
            background-image: radial-gradient(circle at 2px 2px, rgba(43, 157, 238, 0.05) 1px, transparent 0);
            background-size: 24px 24px;
        }
        .glass-panel {
            background: rgba(26, 38, 50, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(43, 157, 238, 0.2);
        }
        .glow-text {
            text-shadow: 0 0 10px rgba(43, 157, 238, 0.5);
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white">
<!-- Header Navigation -->
<header class="sticky top-0 z-50 w-full border-b border-slate-border bg-background-dark/80 backdrop-blur-md">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex justify-between items-center h-16">
<div class="flex items-center gap-8">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl">query_stats</span>
<span class="text-xl font-bold tracking-tight uppercase">imo.cv <span class="text-primary font-light">Intelligence</span></span>
</div>
<nav class="hidden md:flex space-x-8">
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Terminais</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">API Docs</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Metodologia</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Preços</a>
</nav>
</div>
<div class="flex items-center gap-4">
<button class="text-sm font-medium px-4 py-2 hover:bg-white/5 rounded transition-colors">Log In</button>
<button class="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all shadow-lg shadow-primary/20">
                        Solicitar Acesso
                    </button>
</div>
</div>
</div>
</header>
<!-- Real-time Ticker -->
<div class="w-full bg-slate-panel border-b border-slate-border py-2 overflow-hidden whitespace-nowrap">
<div class="flex animate-marquee gap-12 items-center text-[10px] uppercase tracking-widest font-semibold text-slate-400">
<span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> PRAIA: €1.420/m² <span class="text-green-400">+1.2%</span></span>
<span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> MINDELO: €1.150/m² <span class="text-green-400">+0.8%</span></span>
<span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> SAL: €2.890/m² <span class="text-red-400">-0.3%</span></span>
<span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> BOAVISTA: €1.950/m² <span class="text-green-400">+2.5%</span></span>
<span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> YIELD MÉDIO: 6.4% <span class="text-primary">ESTÁVEL</span></span>
<span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> VOL. 24H: €12.4M</span>
</div>
</div>
<main class="data-grid-bg">
<!-- Hero Section -->
<section class="relative pt-12 pb-24 px-4 overflow-hidden">
<div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
<div class="z-10">
<div class="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-1 rounded-full mb-6">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
<span class="text-xs font-bold text-primary tracking-widest uppercase">Institutional Terminal v4.0</span>
</div>
<h1 class="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                        A Ciência dos Dados aplicada ao <span class="text-primary glow-text">Imobiliário</span>
</h1>
<p class="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                        Acesse métricas de nível institucional. Desenvolvido para analistas que exigem dados brutos, precisão técnica e modelos preditivos de alta fidelidade.
                    </p>
<div class="flex flex-wrap gap-4">
<button class="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg flex items-center gap-3 transition-all">
<span class="material-symbols-outlined">terminal</span>
                            Explorar Terminal
                        </button>
<button class="bg-slate-panel border border-slate-border hover:border-primary/50 text-white font-bold py-4 px-8 rounded-lg flex items-center gap-3 transition-all">
<span class="material-symbols-outlined">api</span>
                            Documentação API
                        </button>
</div>
<div class="mt-12 grid grid-cols-3 gap-6 border-t border-slate-border pt-8">
<div>
<div class="text-2xl font-bold text-white">420M€+</div>
<div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Volume Monitorizado</div>
</div>
<div>
<div class="text-2xl font-bold text-white">0.2s</div>
<div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Latência API</div>
</div>
<div>
<div class="text-2xl font-bold text-white">100%</div>
<div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Cobertura Nacional</div>
</div>
</div>
</div>
<div class="relative lg:h-[600px] flex items-center justify-center">
<!-- Map Mockup -->
<div class="glass-panel w-full aspect-square lg:aspect-auto lg:h-full rounded-2xl overflow-hidden relative shadow-2xl border-slate-border">
<div class="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity" data-alt="Technical map visualization of Cape Verde islands with data overlays" data-location="Cape Verde" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBt5-4GxaVYZePGc6x5C4tPeOfp8I6hB2z92kgzQe0C1mP9GBGVc7LnVZLbG4Dgf42EpKQDfciJ3wPnKD81rL9jNFVELkAN7zBALet4C3Lu5_O4PmK73uorFfc_3gdJtX0WtO8ZpzHaEIMx9jl2HnpxYMjmJoPTCCXSqTmdOLwZ2qcU60r_GLdPGTd8-L-tt4ao9b_8qubmRV3HJEoulQAefZgzQtyZ9FX9QKWfhwsmIjG1o8dj-DMXP6uMeOk0vuZ2Mr-DV5BpLZE');">
</div>
<!-- Data Overlays -->
<div class="absolute top-1/4 left-1/4 p-3 glass-panel rounded-lg border-primary/40 animate-pulse">
<div class="text-[10px] text-primary font-bold uppercase mb-1">Ilha do Sal</div>
<div class="text-lg font-bold">Yield 7.2%</div>
<div class="w-full bg-slate-border h-1 mt-2 rounded-full overflow-hidden">
<div class="bg-primary h-full w-3/4"></div>
</div>
</div>
<div class="absolute bottom-1/3 right-1/4 p-3 glass-panel rounded-lg border-primary/40">
<div class="text-[10px] text-primary font-bold uppercase mb-1">Santiago / Praia</div>
<div class="text-lg font-bold">€1,450/m²</div>
<div class="flex gap-1 mt-1">
<div class="w-1 h-3 bg-primary/40"></div>
<div class="w-1 h-5 bg-primary/60"></div>
<div class="w-1 h-4 bg-primary/80"></div>
<div class="w-1 h-6 bg-primary"></div>
</div>
</div>
<!-- Scanning line effect -->
<div class="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent top-0 animate-[scan_4s_linear_infinite]"></div>
</div>
</div>
</div>
</section>
<!-- Feature Grid -->
<section class="py-24 px-4 bg-background-dark">
<div class="max-w-7xl mx-auto">
<div class="mb-16">
<h2 class="text-3xl font-bold mb-4">Infraestrutura de Dados</h2>
<p class="text-slate-400 max-w-2xl">Nossa plataforma fornece os pipelines de dados necessários para modelagem financeira profunda e análise de risco.</p>
</div>
<div class="grid md:grid-cols-3 gap-8">
<!-- API Access -->
<div class="p-8 rounded-xl bg-slate-panel border border-slate-border hover:border-primary/50 transition-all group">
<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined">code</span>
</div>
<h3 class="text-xl font-bold mb-4 text-white">Acesso via API</h3>
<p class="text-slate-400 mb-6 text-sm leading-relaxed">
                            Integração direta via REST API com payloads JSON otimizados. Ideal para alimentar CRMs institucionais e ferramentas de BI proprietárias.
                        </p>
<div class="bg-black/40 p-4 rounded-lg font-mono text-[11px] text-primary/80 border border-slate-border">
<div class="flex justify-between mb-1"><span class="text-slate-500">GET</span> /v1/market/yield</div>
<div>{ "island": "sal", "value": 0.072 }</div>
</div>
</div>
<!-- Raw Data Export -->
<div class="p-8 rounded-xl bg-slate-panel border border-slate-border hover:border-primary/50 transition-all group">
<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined">dataset</span>
</div>
<h3 class="text-xl font-bold mb-4 text-white">Exportação de Dados Brutos</h3>
<p class="text-slate-400 mb-6 text-sm leading-relaxed">
                            Acesso a séries temporais históricas. Exporte conjuntos de dados completos em CSV, XLSX ou Parquet para análise externa.
                        </p>
<ul class="space-y-2">
<li class="flex items-center gap-2 text-xs font-medium text-slate-300">
<span class="material-symbols-outlined text-[14px] text-green-500">check_circle</span> Preços Históricos (10 anos)
                            </li>
<li class="flex items-center gap-2 text-xs font-medium text-slate-300">
<span class="material-symbols-outlined text-[14px] text-green-500">check_circle</span> Granularidade por Bairro
                            </li>
<li class="flex items-center gap-2 text-xs font-medium text-slate-300">
<span class="material-symbols-outlined text-[14px] text-green-500">check_circle</span> Metadados de Transação
                            </li>
</ul>
</div>
<!-- Real-time Monitoring -->
<div class="p-8 rounded-xl bg-slate-panel border border-slate-border hover:border-primary/50 transition-all group">
<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined">monitoring</span>
</div>
<h3 class="text-xl font-bold mb-4 text-white">Monitoramento de Procura</h3>
<p class="text-slate-400 mb-6 text-sm leading-relaxed">
                            Rastreamento de intenção de compra e inventário em tempo real. Identifique desequilíbrios de mercado antes que se tornem tendência.
                        </p>
<div class="relative h-24 w-full flex items-end gap-1 px-2">
<div class="flex-1 bg-slate-border h-1/2 rounded-t-sm"></div>
<div class="flex-1 bg-slate-border h-2/3 rounded-t-sm"></div>
<div class="flex-1 bg-primary/40 h-3/4 rounded-t-sm"></div>
<div class="flex-1 bg-primary/60 h-2/3 rounded-t-sm"></div>
<div class="flex-1 bg-primary h-full rounded-t-sm shadow-[0_0_15px_rgba(43,157,238,0.4)]"></div>
</div>
</div>
</div>
</div>
</section>
<!-- Pricing Section -->
<section class="py-24 px-4">
<div class="max-w-5xl mx-auto text-center">
<h2 class="text-3xl font-bold mb-4 uppercase tracking-tighter italic">Níveis de Inteligência</h2>
<p class="text-slate-400 mb-16 max-w-xl mx-auto">Planos escaláveis para investidores individuais até fundos de private equity.</p>
<div class="grid md:grid-cols-3 gap-0">
<!-- Standard -->
<div class="bg-slate-panel/50 border border-slate-border p-10 rounded-l-xl flex flex-col items-center">
<span class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Standard</span>
<div class="text-4xl font-bold mb-6">€199<span class="text-lg text-slate-500">/mês</span></div>
<ul class="text-sm text-slate-400 space-y-4 mb-10 text-left w-full">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-sm">check</span> Dashboards Básicos</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-sm">check</span> Exportação CSV (50/mês)</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-slate-600 text-sm">close</span> Sem Acesso API</li>
</ul>
<button class="w-full py-3 rounded border border-slate-border hover:border-primary font-bold transition-all mt-auto">Começar</button>
</div>
<!-- Institutional -->
<div class="bg-background-dark border-x-2 border-y-4 border-primary p-12 rounded-xl scale-105 z-10 shadow-2xl flex flex-col items-center relative overflow-hidden">
<div class="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold py-1 px-4 uppercase tracking-tighter">Mais Popular</div>
<span class="text-xs font-bold text-primary uppercase tracking-widest mb-4">Institutional</span>
<div class="text-4xl font-bold mb-6 text-white">€899<span class="text-lg text-slate-500">/mês</span></div>
<ul class="text-sm text-slate-300 space-y-4 mb-10 text-left w-full">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Terminal Completo</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> API Access ilimitado</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Dados em Tempo Real</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-sm">check</span> Suporte Prioritário 24/7</li>
</ul>
<button class="w-full py-4 rounded bg-primary text-white font-bold transition-all shadow-lg shadow-primary/25 mt-auto">Assinar Agora</button>
</div>
<!-- Enterprise -->
<div class="bg-slate-panel/50 border border-slate-border p-10 rounded-r-xl flex flex-col items-center">
<span class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Enterprise</span>
<div class="text-4xl font-bold mb-6 tracking-tighter italic">Sob Consulta</div>
<ul class="text-sm text-slate-400 space-y-4 mb-10 text-left w-full">
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-sm">check</span> Custom ETL Pipelines</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-sm">check</span> White-label Reports</li>
<li class="flex items-center gap-2"><span class="material-symbols-outlined text-green-500 text-sm">check</span> Account Manager</li>
</ul>
<button class="w-full py-3 rounded border border-slate-border hover:border-primary font-bold transition-all mt-auto">Falar com Vendas</button>
</div>
</div>
</div>
</section>
<!-- Terminal Preview (Visual Polish) -->
<section class="py-24 px-4">
<div class="max-w-7xl mx-auto glass-panel rounded-2xl p-4 lg:p-12 border-slate-border shadow-inner">
<div class="flex items-center gap-2 mb-6">
<div class="flex gap-1.5">
<div class="w-3 h-3 rounded-full bg-red-500/50"></div>
<div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
<div class="w-3 h-3 rounded-full bg-green-500/50"></div>
</div>
<div class="flex-1 text-center font-mono text-xs text-slate-500 tracking-widest">IMO_TERMINAL_V4.0.12</div>
</div>
<div class="grid lg:grid-cols-12 gap-8">
<div class="lg:col-span-8">
<div class="h-64 bg-black/40 rounded-lg p-6 relative overflow-hidden flex items-end">
<!-- Visual Chart Mock -->
<svg class="w-full h-full text-primary" viewbox="0 0 1000 200">
<path d="M0 150 Q 50 140, 100 120 T 200 100 T 300 130 T 400 80 T 500 60 T 600 90 T 700 40 T 800 50 T 900 20 T 1000 10" fill="none" stroke="currentColor" stroke-width="3"></path>
<path d="M0 150 Q 50 140, 100 120 T 200 100 T 300 130 T 400 80 T 500 60 T 600 90 T 700 40 T 800 50 T 900 20 T 1000 10 V 200 H 0 Z" fill="currentColor" fill-opacity="0.1"></path>
</svg>
<div class="absolute top-6 left-6">
<h4 class="text-xs font-bold uppercase text-slate-500 mb-1">Market Volatility Index</h4>
<div class="text-2xl font-bold">14.22 <span class="text-green-500 text-sm">(-2.4%)</span></div>
</div>
</div>
</div>
<div class="lg:col-span-4 space-y-4">
<div class="bg-black/40 rounded-lg p-4">
<h4 class="text-[10px] font-bold uppercase text-slate-500 mb-3 tracking-widest">Recentes Negócios</h4>
<div class="space-y-3">
<div class="flex justify-between items-center text-xs">
<span class="font-mono">#TRX-8921</span>
<span class="text-white font-bold">€245,000</span>
<span class="text-slate-500 italic">2m ago</span>
</div>
<div class="flex justify-between items-center text-xs">
<span class="font-mono">#TRX-8920</span>
<span class="text-white font-bold">€112,500</span>
<span class="text-slate-500 italic">8m ago</span>
</div>
<div class="flex justify-between items-center text-xs">
<span class="font-mono">#TRX-8919</span>
<span class="text-white font-bold">€390,000</span>
<span class="text-slate-500 italic">14m ago</span>
</div>
</div>
</div>
<button class="w-full py-4 bg-primary/20 text-primary border border-primary/40 rounded-lg font-bold hover:bg-primary transition-all hover:text-white">
                            Launch Full Terminal
                        </button>
</div>
</div>
</div>
</section>
</main>
<footer class="bg-background-dark border-t border-slate-border pt-16 pb-8 px-4">
<div class="max-w-7xl mx-auto">
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
<div class="col-span-2">
<div class="flex items-center gap-2 mb-6">
<span class="material-symbols-outlined text-primary text-2xl">query_stats</span>
<span class="text-lg font-bold tracking-tight uppercase">imo.cv <span class="text-primary font-light">Intel</span></span>
</div>
<p class="text-sm text-slate-500 leading-relaxed max-w-xs">
                        Líder em Cape Verde para análise institucional de ativos imobiliários e inteligência de mercado orientada por dados.
                    </p>
</div>
<div>
<h5 class="text-xs font-bold uppercase tracking-widest text-white mb-6">Dados</h5>
<ul class="text-sm text-slate-500 space-y-4">
<li><a class="hover:text-primary transition-colors" href="#">Yield Terminal</a></li>
<li><a class="hover:text-primary transition-colors" href="#">API Pricing</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Séries Temporais</a></li>
</ul>
</div>
<div>
<h5 class="text-xs font-bold uppercase tracking-widest text-white mb-6">Empresa</h5>
<ul class="text-sm text-slate-500 space-y-4">
<li><a class="hover:text-primary transition-colors" href="#">Metodologia</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Compliance</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Blog Tech</a></li>
</ul>
</div>
<div class="col-span-2">
<h5 class="text-xs font-bold uppercase tracking-widest text-white mb-6">Newsletter Analítica</h5>
<div class="flex gap-2">
<input class="bg-slate-panel border-slate-border rounded-lg flex-1 text-sm focus:ring-primary focus:border-primary" placeholder="email@instituicao.pt" type="email"/>
<button class="bg-primary px-4 rounded-lg text-white font-bold text-sm">Join</button>
</div>
</div>
</div>
<div class="border-t border-slate-border pt-8 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
<div class="flex gap-6">
<a class="hover:text-slate-400" href="#">Legal</a>
<a class="hover:text-slate-400" href="#">Privacy</a>
<a class="hover:text-slate-400" href="#">Terms</a>
</div>
<p>© 2024 imo.cv Market Intelligence. Todos os direitos reservados.</p>
</div>
</div>
</footer>
<style>
        @keyframes scan {
            0% { transform: translateY(0); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateY(600px); opacity: 0; }
        }
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
    </style>
</body></html>

<!-- Market Intelligence: ROI-Focused Variant -->
<!DOCTYPE html>

<html lang="pt-CV"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv | Market Intelligence &amp; ROI</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f59f0a",
                        "background-light": "#f8f7f5",
                        "background-dark": "#221c10",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body { font-family: 'Manrope', sans-serif; }
        .glass-effect { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(8px); }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
<!-- Top Navigation Bar -->
<header class="sticky top-0 z-50 glass-effect border-b border-slate-200 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="bg-primary p-1.5 rounded-lg text-white">
<span class="material-symbols-outlined text-2xl">analytics</span>
</div>
<span class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">imo.cv</span>
</div>
<nav class="hidden md:flex items-center gap-10">
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#features">Funcionalidades</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#success">Casos de Sucesso</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#reports">Relatórios</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#pricing">Preços</a>
</nav>
<div class="flex items-center gap-4">
<button class="hidden sm:block text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Login</button>
<button class="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Começar Agora
                </button>
</div>
</div>
</header>
<main>
<!-- Hero Section -->
<section class="relative overflow-hidden pt-16 pb-24 lg:pt-28 lg:pb-32">
<div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
<div class="flex-1 text-left">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
<span class="material-symbols-outlined text-sm">trending_up</span>
                        Inteligência Imobiliária Cabo Verde
                    </div>
<h1 class="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-8">
                        Maximize o seu ROI com <span class="text-primary">Inteligência Local</span>
</h1>
<p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-xl">
                        Insights baseados em dados reais do mercado de Cabo Verde. Identifique oportunidades de alto rendimento antes que elas se tornem mainstream.
                    </p>
<div class="flex flex-wrap gap-4">
<button class="bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-primary/30 hover:translate-y-[-2px] transition-all flex items-center gap-2">
                            Ver Planos de Investimento
                            <span class="material-symbols-outlined">arrow_forward</span>
</button>
<button class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold px-8 py-4 rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
<span class="material-symbols-outlined">play_circle</span>
                            Ver Demo
                        </button>
</div>
</div>
<div class="flex-1 w-full relative">
<div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
<img alt="Luxury real estate development project" class="w-full aspect-video object-cover" data-alt="Modern luxury villa overlooking the ocean in Sal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkLcS8DYgAXlWQpH2OrUmfbG-OXqJs3dGVyc49vPnvFOlm1WCxc-QV1zAiY6xZ8VQs3oq6Xp2-oTv8g9DxUg0M1I9TOgGJkGNC27HE24Xj_ra49TSpFPOYu9LWRjlDxUfNpVfTaLodaQk54i79K9tR_OCFvG030cM05bjKQ3ismSkPj02cLQLPj-mWe3mZWUck2gDYF9l_YB83upn7VaZc-z7NjpxF20drzRj4M2qCgMutFuc2WLyjjtE3CvEZqCI78YAb7V_w7wI"/>
</div>
<!-- Floating Data Card -->
<div class="absolute -bottom-10 -left-10 z-20 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 hidden md:block">
<div class="flex items-center gap-4 mb-4">
<div class="size-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
<span class="material-symbols-outlined">payments</span>
</div>
<div>
<p class="text-xs font-bold text-slate-400 uppercase">Yield Médio Sal</p>
<p class="text-2xl font-black text-slate-900 dark:text-white">8.4% <span class="text-sm font-bold text-green-500">+1.2%</span></p>
</div>
</div>
<div class="h-2 w-48 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
<div class="h-full bg-primary w-3/4 rounded-full"></div>
</div>
</div>
</div>
</div>
<!-- Background Decoration -->
<div class="absolute top-0 right-0 -z-10 w-1/3 h-full bg-primary/5 blur-3xl rounded-full"></div>
</section>
<!-- ROI Metrics Section -->
<section class="py-20 bg-white dark:bg-slate-900/50">
<div class="max-w-7xl mx-auto px-6">
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="p-8 rounded-3xl bg-background-light dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all group">
<div class="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
<span class="material-symbols-outlined text-3xl">insights</span>
</div>
<h3 class="text-xl font-bold mb-3">Crescimento de Mercado</h3>
<p class="text-4xl font-black text-slate-900 dark:text-white mb-2">+12.5%</p>
<p class="text-slate-500 text-sm">Aumento médio do valor dos ativos em Praia e Santa Maria nos últimos 12 meses.</p>
</div>
<div class="p-8 rounded-3xl bg-background-light dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all group">
<div class="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
<span class="material-symbols-outlined text-3xl">location_on</span>
</div>
<h3 class="text-xl font-bold mb-3">Zonas de Alta Demanda</h3>
<p class="text-4xl font-black text-slate-900 dark:text-white mb-2">94% Occ.</p>
<p class="text-slate-500 text-sm">Taxa de ocupação média para arrendamentos de curta duração em Boa Vista.</p>
</div>
<div class="p-8 rounded-3xl bg-background-light dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all group">
<div class="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
<span class="material-symbols-outlined text-3xl">verified_user</span>
</div>
<h3 class="text-xl font-bold mb-3">Previsão de Valorização</h3>
<p class="text-4xl font-black text-slate-900 dark:text-white mb-2">ROI 15%</p>
<p class="text-slate-500 text-sm">Projeção conservadora para novos empreendimentos residenciais de luxo em 2024.</p>
</div>
</div>
</div>
</section>
<!-- Success Stories -->
<section class="py-24" id="success">
<div class="max-w-7xl mx-auto px-6">
<div class="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
<div class="max-w-2xl">
<h2 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Casos de Sucesso</h2>
<p class="text-lg text-slate-500">Veja como investidores institucionais e promotores locais utilizaram nossos dados para maximizar lucros.</p>
</div>
<button class="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
                        Ver todos os estudos <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
<!-- Case Study 1 -->
<div class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row">
<div class="sm:w-2/5 relative">
<img alt="Modern Apartment Building" class="h-full w-full object-cover" data-alt="Modern residential building in Praia City" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuuo39YIZBcObhIr84tbiqFUv39JXXybGs5DxAAusSAGy1FgVQ4j1v6tS9YiYa5gbCScvCjrqp80qu0iY1kDBSDMefVZ8DrctJbK0sBx-On2gn7hw1r3IFFfc1iglbakjVIUitwdplVQuJWHe12PDUEt_PYdHy7MHBsXNPTxoKBTt7Vx4k061EFQ8sWL58QokbgZGZveEdBogxy1VxSgZKdgR7IXmMTxaAKYAolr4oJisDuKNDNNyCzg1ikMpTr_XpJan5GDuO6Fc"/>
<div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-slate-900 shadow">PRAIA</div>
</div>
<div class="p-8 sm:w-3/5 flex flex-col justify-center">
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary fill-1">star</span>
<span class="text-xs font-bold uppercase text-slate-400 tracking-widest">PROJETO RESIDENCIAL</span>
</div>
<h4 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Empreendimento Miramar</h4>
<div class="grid grid-cols-2 gap-4 mb-6">
<div>
<p class="text-xs font-bold text-slate-400">ROI ALCANÇADO</p>
<p class="text-xl font-black text-green-500">+18.2%</p>
</div>
<div>
<p class="text-xs font-bold text-slate-400">TEMPO DE VENDA</p>
<p class="text-xl font-black text-slate-900 dark:text-white">4 MESES</p>
</div>
</div>
<p class="text-slate-500 text-sm italic">"A imo.cv identificou uma lacuna no mercado premium da capital 6 meses antes da concorrência."</p>
</div>
</div>
<!-- Case Study 2 -->
<div class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row">
<div class="sm:w-2/5 relative">
<img alt="Beachfront Resort" class="h-full w-full object-cover" data-alt="Eco-friendly beachfront resort in Boa Vista" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy5QXNDzU4zx2bdLiFgQir_hLTWXxDZaVYSC3KY1cvl1BY5x8RQPakvSjrdabxbKtpPA2mMIi4_S8iF-iaHV2MLHhNc-Fwh915N0umKeJlRcA_GVSfHgkayn71Y-HJHi2CYzqeQz5TTmXQrTcXHbmKltwJofTLt37qKrgg4RK63ZQGLJuSbvW5zixtmMGrCvIg0H9AaGfccKpYOMK5EhortLkMK8B6xrjZxyzVCFg4FvAAgzHjgtNYV6YaRN6LF2JyjTvf8p7Av6w"/>
<div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-slate-900 shadow">BOA VISTA</div>
</div>
<div class="p-8 sm:w-3/5 flex flex-col justify-center">
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary fill-1">star</span>
<span class="text-xs font-bold uppercase text-slate-400 tracking-widest">TURISMO DE LUXO</span>
</div>
<h4 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Resort Oasis Palms</h4>
<div class="grid grid-cols-2 gap-4 mb-6">
<div>
<p class="text-xs font-bold text-slate-400">ROI ALCANÇADO</p>
<p class="text-xl font-black text-green-500">+22.5%</p>
</div>
<div>
<p class="text-xs font-bold text-slate-400">YIELD ANUAL</p>
<p class="text-xl font-black text-slate-900 dark:text-white">11.4%</p>
</div>
</div>
<p class="text-slate-500 text-sm italic">"Utilizamos o heatmap de demanda turística para posicionar o resort estrategicamente."</p>
</div>
</div>
</div>
</div>
</section>
<!-- Sample Report / Lead Gen -->
<section class="py-24 bg-background-light dark:bg-slate-800/20 relative overflow-hidden" id="reports">
<div class="max-w-7xl mx-auto px-6 relative z-10">
<div class="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-12 lg:p-20 overflow-hidden relative flex flex-col lg:flex-row items-center gap-16">
<div class="flex-1 text-white">
<h2 class="text-4xl lg:text-5xl font-extrabold mb-6">Relatório Gratuito: O Estado do Mercado 2024</h2>
<p class="text-slate-400 text-lg mb-10">Receba uma amostra dos nossos dados premium. Inclui tendências de preços, análise de infraestrutura e previsões para os próximos 24 meses.</p>
<div class="space-y-4 mb-10">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span class="font-medium">Análise de 5 Ilhas Principais</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span class="font-medium">Top 10 Hotspots de Investimento</span>
</div>
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span class="font-medium">Comparativo de Taxas Fiscais</span>
</div>
</div>
<form class="flex flex-col sm:flex-row gap-4">
<input class="flex-1 bg-white/10 border-white/20 rounded-xl px-6 py-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Seu e-mail corporativo" type="email"/>
<button class="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all whitespace-nowrap" type="submit">
                                Baixar Amostra PDF
                            </button>
</form>
</div>
<div class="flex-1 w-full flex justify-center">
<div class="relative w-full max-w-sm aspect-[3/4] bg-white rounded-xl shadow-2xl p-8 rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-slate-50 to-white -z-10"></div>
<div class="flex justify-between items-center mb-8">
<div class="size-8 bg-primary rounded"></div>
<div class="text-[10px] font-bold text-slate-400">MARKET REPORT v2.4</div>
</div>
<div class="space-y-4">
<div class="h-6 w-3/4 bg-slate-200 rounded"></div>
<div class="h-6 w-1/2 bg-slate-200 rounded"></div>
<div class="pt-8 grid grid-cols-2 gap-4">
<div class="h-20 bg-primary/10 rounded flex items-center justify-center">
<div class="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin-slow"></div>
</div>
<div class="h-20 bg-slate-100 rounded"></div>
</div>
<div class="h-2 w-full bg-slate-100 rounded"></div>
<div class="h-2 w-full bg-slate-100 rounded"></div>
<div class="h-2 w-2/3 bg-slate-100 rounded"></div>
</div>
<div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
</div>
</div>
<!-- Decor -->
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px]"></div>
</div>
</div>
</section>
<!-- Testimonials -->
<section class="py-24">
<div class="max-w-7xl mx-auto px-6 text-center">
<h2 class="text-3xl font-extrabold mb-16">Confiado por Desenvolvedores de Elite</h2>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
<div class="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm text-left border border-slate-100 dark:border-slate-700">
<div class="flex gap-1 text-primary mb-6">
<span class="material-symbols-outlined fill-1">star</span>
<span class="material-symbols-outlined fill-1">star</span>
<span class="material-symbols-outlined fill-1">star</span>
<span class="material-symbols-outlined fill-1">star</span>
<span class="material-symbols-outlined fill-1">star</span>
</div>
<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 italic">"A imo.cv mudou a forma como abordamos novos investimentos em Cabo Verde. Antes, baseávamo-nos no instinto; agora, cada decisão é sustentada por métricas precisas de ROI."</p>
<div class="flex items-center gap-4">
<img alt="Developer Headshot" class="size-14 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYg6Kj6qR-Bdl8VACNdnviu3zbCqkT2MvvNqPn9YULUIV8up9sDe6L78tJwvn70C7wUuFTauFTREvIkuSXsFtjh0hz4V2hHkSZE3j55tDk5-O4PeaGRLrQAxSHxLY3b6Z9c5pRSWF0t1icYp-oswl4ViDDr4AzcSADocslJcsvAix8GEuFaP0m5yCib33MK5oa2qtYg-7T4mXpNaCkSJA7yX3JFeKRl61djCwOjpd-qEkOazd25c695zlYtf7lpytvWPm5Bn2GfNU"/>
<div>
<h5 class="font-bold text-slate-900 dark:text-white">Ricardo Silva</h5>
<p class="text-sm text-slate-400">CEO, Cabo Capital Development</p>
</div>
</div>
</div>
<div class="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm text-left border border-slate-100 dark:border-slate-700">
<div class="flex gap-1 text-primary mb-6">
<span class="material-symbols-outlined fill-1">star</span>
<span class="material-symbols-outlined fill-1">star</span>
<span class="material-symbols-outlined fill-1">star</span>
<span class="material-symbols-outlined fill-1">star</span>
<span class="material-symbols-outlined fill-1">star</span>
</div>
<p class="text-xl text-slate-600 dark:text-slate-300 mb-8 italic">"Os heatmaps de demanda são a funcionalidade mais valiosa. Conseguimos prever quais áreas da Ilha do Sal iriam valorizar com uma precisão impressionante."</p>
<div class="flex items-center gap-4">
<img alt="Investor Headshot" class="size-14 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtvRR0OQ2aYIoALiqTgXUGVl-n5oNrpUqwiY3GovA2TibOaSW2kgdDkPtDusAlCFEMQ74Dyuc1HHPxypro8I3LH-dihWAFGXQ67xs2MI3QNrXYVrDd0AOR3JNdyDLiL6PWjKz2GGUsMC_rAQ0XUTfsWCVrVp5vNYdVZdk7hOKrJjjOsSa2T9Sjlu-i_hDlA68GWF3d0oIoyZyIM_FPVm4gEO-6UWr14HELWYuOy4N2xtNlGbeiNwbeMbd7M_oKkG2sZxXxat8bcuo"/>
<div>
<h5 class="font-bold text-slate-900 dark:text-white">Isabel Mendonça</h5>
<p class="text-sm text-slate-400">Investidora Imobiliária Independente</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Final CTA -->
<section class="py-24 bg-primary text-white">
<div class="max-w-4xl mx-auto px-6 text-center">
<h2 class="text-4xl lg:text-5xl font-black mb-8">Pronto para transformar dados em lucro?</h2>
<p class="text-lg text-white/80 mb-12">Junte-se a centenas de investidores que já utilizam a imo.cv para dominar o mercado imobiliário em Cabo Verde.</p>
<div class="flex flex-col sm:flex-row gap-6 justify-center">
<button class="bg-white text-primary font-black px-10 py-5 rounded-2xl shadow-2xl hover:bg-slate-50 transition-all text-lg">
                        Começar Agora Grátis
                    </button>
<button class="bg-black/20 text-white font-bold px-10 py-5 rounded-2xl border border-white/30 hover:bg-black/30 transition-all text-lg">
                        Falar com Especialista
                    </button>
</div>
<p class="mt-8 text-sm text-white/60">Sem necessidade de cartão de crédito para o período de teste.</p>
</div>
</section>
</main>
<footer class="bg-white dark:bg-background-dark py-12 border-t border-slate-200 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
<div class="flex items-center gap-3">
<div class="bg-primary p-1 rounded-lg text-white">
<span class="material-symbols-outlined text-xl">analytics</span>
</div>
<span class="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">imo.cv</span>
</div>
<div class="flex gap-8 text-sm text-slate-500">
<a class="hover:text-primary transition-colors" href="#">Termos de Uso</a>
<a class="hover:text-primary transition-colors" href="#">Privacidade</a>
<a class="hover:text-primary transition-colors" href="#">Cookies</a>
</div>
<p class="text-sm text-slate-400">© 2024 imo.cv Market Intelligence. Todos os direitos reservados.</p>
</div>
</footer>
</body></html>

<!-- Market Intelligence: Corporate Variant -->
<!DOCTYPE html>

<html lang="pt-CV"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv | Market Intelligence: Corporate Variant</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.symbols.google.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#134dec",
                        "background-light": "#f6f6f8",
                        "background-dark": "#101522",
                        "success-green": "#07883d",
                        "accent-gold": "#b3944d",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Manrope', sans-serif;
        }
        .chart-gradient {
            background: linear-gradient(180deg, rgba(19, 77, 236, 0.1) 0%, rgba(19, 77, 236, 0) 100%);
        }
        .gold-border {
            border-image: linear-gradient(to bottom right, #b3944d, #d4af37) 1;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
<!-- Top Navigation Bar -->
<header class="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex justify-between items-center h-20">
<div class="flex items-center gap-2">
<div class="p-2 bg-primary rounded-lg text-white">
<span class="material-symbols-outlined text-2xl">analytics</span>
</div>
<span class="text-2xl font-800 tracking-tight text-slate-900 dark:text-white uppercase">imo.cv</span>
</div>
<nav class="hidden md:flex items-center space-x-8">
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Relatórios</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Consultoria</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Metodologia</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Preços</a>
</nav>
<div class="flex items-center gap-4">
<button class="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Entrar</button>
<button class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                        Falar com Especialista
                    </button>
</div>
</div>
</div>
</header>
<main>
<!-- Split Hero Section -->
<section class="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-200 dark:border-slate-800">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid lg:grid-cols-2 gap-12 items-center">
<!-- Left Column: Content -->
<div class="flex flex-col gap-8">
<div class="inline-flex items-center gap-2 bg-accent-gold/10 text-accent-gold px-3 py-1 rounded-full border border-accent-gold/20 w-fit">
<span class="material-symbols-outlined text-sm font-bold">verified</span>
<span class="text-xs font-bold uppercase tracking-wider">Benchmark Oficial do Mercado</span>
</div>
<h1 class="text-5xl lg:text-6xl font-800 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                            A sua Vantagem <span class="text-primary">Competitiva</span> no Mercado de Cabo Verde
                        </h1>
<p class="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                            Decisões institucionais baseadas em dados reais de alta fidelidade. Aceda ao único índice oficial de performance económica e imobiliária do arquipélago.
                        </p>
<div class="flex flex-wrap gap-4">
<button class="bg-primary text-white px-8 py-4 rounded-xl text-base font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform">
                                Aceder ao Dashboard
                                <span class="material-symbols-outlined">arrow_forward</span>
</button>
<button class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl text-base font-bold hover:bg-slate-50 transition-colors">
                                Ver Amostra PDF
                            </button>
</div>
<!-- Quick Stats Mini Row -->
<div class="flex gap-8 pt-4 border-t border-slate-200 dark:border-slate-800">
<div>
<p class="text-2xl font-bold text-slate-900 dark:text-white">500k+</p>
<p class="text-xs font-semibold text-slate-500 uppercase tracking-widest">Data Points / Mês</p>
</div>
<div>
<p class="text-2xl font-bold text-slate-900 dark:text-white">98%</p>
<p class="text-xs font-semibold text-slate-500 uppercase tracking-widest">Cobertura Nacional</p>
</div>
<div>
<p class="text-2xl font-bold text-slate-900 dark:text-white">24/7</p>
<p class="text-xs font-semibold text-slate-500 uppercase tracking-widest">Atualização Live</p>
</div>
</div>
</div>
<!-- Right Column: Interactive Visual -->
<div class="relative group">
<!-- Decorative Elements -->
<div class="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
<div class="absolute -bottom-12 -left-12 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl"></div>
<!-- Main Card -->
<div class="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
<div class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
<div>
<h3 class="font-bold text-slate-900 dark:text-white">Price Index: Residential</h3>
<p class="text-xs text-slate-500">Últimos 12 meses • Nacional</p>
</div>
<div class="bg-success-green/10 text-success-green px-2 py-1 rounded text-xs font-bold">
                                    +2.4% MoM
                                </div>
</div>
<!-- Mockup Chart Area -->
<div class="h-64 chart-gradient relative px-4 flex items-end">
<div class="w-full h-full absolute top-0 left-0 bg-center bg-no-repeat bg-cover opacity-10 grayscale" data-alt="Corporate building reflections background" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2D_4Sz2iXMufQ2N0DZr3-ZN69xZsB9glWfq9nKDDAli1eBY8V7VUk5iuPODb3V8RIRJKj8xSayPJiwoS7siyEsBd3zrNAQOT4Ex80ji6zoqQSdqqRcRgXPPvc-eKtl4Cs6x_CynTo5ZXEC5XJmQdrWSAa__Lj7-jG7VbAtSQG3X5G7PGzMGlcLAXxkdPRnusnjOYck5aKwBmAlfT0SQEUHkjho4Aq_RYT55aWc7fn7hGYZ9-NUYyjVnrCzylw-cMQqMn66c3eaws');"></div>
<svg class="w-full h-48 text-primary" preserveaspectratio="none" viewbox="0 0 400 100">
<path d="M0,80 L40,75 L80,85 L120,60 L160,65 L200,40 L240,45 L280,20 L320,25 L360,10 L400,5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="4"></path>
<path d="M0,80 L40,75 L80,85 L120,60 L160,65 L200,40 L240,45 L280,20 L320,25 L360,10 L400,5 L400,100 L0,100 Z" fill="rgba(19, 77, 236, 0.05)"></path>
</svg>
<!-- Floating Data Point -->
<div class="absolute top-1/4 right-1/4 bg-slate-900 text-white p-2 rounded shadow-xl text-[10px] font-bold">
                                    Q4 2023: 142.5 pts
                                </div>
</div>
<!-- Footer Data -->
<div class="p-6 bg-slate-50 dark:bg-slate-800/50 grid grid-cols-3 gap-4">
<div class="flex flex-col gap-1">
<span class="text-[10px] uppercase font-bold text-slate-400">Yield Médio</span>
<span class="font-bold text-slate-900 dark:text-white text-sm">6.8%</span>
</div>
<div class="flex flex-col gap-1">
<span class="text-[10px] uppercase font-bold text-slate-400">Absorção</span>
<span class="font-bold text-slate-900 dark:text-white text-sm">84 dias</span>
</div>
<div class="flex flex-col gap-1">
<span class="text-[10px] uppercase font-bold text-slate-400">Volume</span>
<span class="font-bold text-slate-900 dark:text-white text-sm">€42.1M</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Institutional Services Section -->
<section class="py-24 bg-white dark:bg-background-dark">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
<div class="max-w-2xl">
<h2 class="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">Serviços Institucionais</h2>
<h3 class="text-4xl font-800 text-slate-900 dark:text-white leading-tight">
                            Market Intelligence de Elite para Investidores Estratégicos
                        </h3>
</div>
<p class="text-slate-500 dark:text-slate-400 max-w-sm">
                        Transformamos dados granulares em insights acionáveis, garantindo que o seu capital seja aplicado com a máxima segurança e rentabilidade.
                    </p>
</div>
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Quarterly Reports -->
<div class="group p-8 rounded-2xl bg-background-light dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all flex flex-col justify-between min-h-[400px]">
<div>
<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined font-bold">menu_book</span>
</div>
<h4 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Relatórios Trimestrais</h4>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Análises profundas sobre a evolução do mercado, tendências de preços e projeções macroeconómicas oficiais do arquipélago.
                            </p>
<ul class="space-y-3">
<li class="flex items-center gap-2 text-sm text-slate-500 font-medium">
<span class="material-symbols-outlined text-success-green text-sm font-bold">check_circle</span>
                                    Análise de Preço por Ilha
                                </li>
<li class="flex items-center gap-2 text-sm text-slate-500 font-medium">
<span class="material-symbols-outlined text-success-green text-sm font-bold">check_circle</span>
                                    Pipeline de Novos Projetos
                                </li>
<li class="flex items-center gap-2 text-sm text-slate-500 font-medium">
<span class="material-symbols-outlined text-success-green text-sm font-bold">check_circle</span>
                                    Indicadores de Liquidez
                                </li>
</ul>
</div>
<button class="mt-8 text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                            Baixar Amostra PDF <span class="material-symbols-outlined text-sm">download</span>
</button>
</div>
<!-- Custom Consulting -->
<div class="group p-8 rounded-2xl bg-background-light dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all flex flex-col justify-between min-h-[400px]">
<div>
<div class="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center text-accent-gold mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined font-bold">handshake</span>
</div>
<h4 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Consultoria Estratégica</h4>
<p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Apoio personalizado para grandes investimentos imobiliários e análise de viabilidade económica tailor-made.
                            </p>
<ul class="space-y-3">
<li class="flex items-center gap-2 text-sm text-slate-500 font-medium">
<span class="material-symbols-outlined text-success-green text-sm font-bold">check_circle</span>
                                    Due Diligence de Mercado
                                </li>
<li class="flex items-center gap-2 text-sm text-slate-500 font-medium">
<span class="material-symbols-outlined text-success-green text-sm font-bold">check_circle</span>
                                    Site Selection Strategy
                                </li>
<li class="flex items-center gap-2 text-sm text-slate-500 font-medium">
<span class="material-symbols-outlined text-success-green text-sm font-bold">check_circle</span>
                                    Risk Assessment Reports
                                </li>
</ul>
</div>
<button class="mt-8 text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                            Agendar Reunião <span class="material-symbols-outlined text-sm">calendar_today</span>
</button>
</div>
<!-- API & Data Access -->
<div class="group p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 transition-all flex flex-col justify-between min-h-[400px]">
<div>
<div class="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined font-bold">database</span>
</div>
<h4 class="text-2xl font-bold mb-4">Acesso Live via API</h4>
<p class="text-slate-400 leading-relaxed mb-6">
                                Integre os dados oficiais do mercado de Cabo Verde diretamente nos seus sistemas de gestão ou CRM imobiliário.
                            </p>
<div class="bg-white/5 rounded-lg p-4 font-mono text-[10px] text-slate-300">
<code>GET /api/v1/market/index?island=sal</code><br/>
<code>{ "status": "200", "growth": "+2.4%" }</code>
</div>
</div>
<button class="mt-8 text-white font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all opacity-80 hover:opacity-100">
                            Documentação Técnica <span class="material-symbols-outlined text-sm">code</span>
</button>
</div>
</div>
</div>
</section>
<!-- Trust & Logos -->
<section class="py-16 border-t border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
<p class="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-10">Parceiros e Entidades Oficiais</p>
<div class="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
<div class="text-2xl font-900 text-slate-700 dark:text-slate-300 italic">BANCO CENTRAL</div>
<div class="text-2xl font-900 text-slate-700 dark:text-slate-300 tracking-tighter">GOV.CV</div>
<div class="text-2xl font-900 text-slate-700 dark:text-slate-300">INE.CV</div>
<div class="text-2xl font-900 text-slate-700 dark:text-slate-300">ECOWAS BANK</div>
<div class="text-2xl font-900 text-slate-700 dark:text-slate-300">PROEMPRESA</div>
</div>
</div>
</section>
<!-- Final CTA -->
<section class="py-24 bg-primary relative overflow-hidden">
<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
<h2 class="text-4xl md:text-5xl font-800 text-white mb-8">
                    Pronto para dominar o mercado de Cabo Verde?
                </h2>
<p class="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                    Junte-se às principais instituições financeiras e investidores internacionais que já utilizam a imo.cv para guiar as suas decisões.
                </p>
<div class="flex flex-col sm:flex-row justify-center gap-4">
<button class="bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-slate-50 transition-colors">
                        Começar Agora Grátis
                    </button>
<button class="bg-primary border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                        Solicitar Demo Corporate
                    </button>
</div>
</div>
</section>
</main>
<footer class="bg-slate-900 text-white pt-20 pb-10">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
<div class="col-span-2 md:col-span-1 flex flex-col gap-6">
<div class="flex items-center gap-2">
<div class="p-1.5 bg-primary rounded text-white">
<span class="material-symbols-outlined text-xl">analytics</span>
</div>
<span class="text-xl font-800 tracking-tight uppercase">imo.cv</span>
</div>
<p class="text-sm text-slate-400 leading-relaxed">
                        A plataforma líder de Market Intelligence imobiliário e económico em Cabo Verde. Transparência, dados e autoridade.
                    </p>
</div>
<div>
<h5 class="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Produtos</h5>
<ul class="space-y-4 text-sm font-semibold text-slate-300">
<li><a class="hover:text-primary transition-colors" href="#">Relatórios de Mercado</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Preços por Localidade</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Análise de Rendibilidade</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Soluções Enterprise</a></li>
</ul>
</div>
<div>
<h5 class="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Recursos</h5>
<ul class="space-y-4 text-sm font-semibold text-slate-300">
<li><a class="hover:text-primary transition-colors" href="#">Metodologia de Dados</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Blog &amp; Notícias</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Suporte ao Cliente</a></li>
<li><a class="hover:text-primary transition-colors" href="#">API Docs</a></li>
</ul>
</div>
<div>
<h5 class="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Contacto</h5>
<ul class="space-y-4 text-sm font-semibold text-slate-300">
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-slate-500 text-sm">mail</span>
                            info@imo.cv
                        </li>
<li class="flex items-center gap-2">
<span class="material-symbols-outlined text-slate-500 text-sm">location_on</span>
                            Cidade da Praia, Cabo Verde
                        </li>
</ul>
</div>
</div>
<div class="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="text-xs text-slate-500 font-medium">
                    © 2024 imo.cv Market Intelligence. Todos os direitos reservados.
                </p>
<div class="flex gap-6 text-xs text-slate-500 font-medium">
<a class="hover:text-white" href="#">Termos de Uso</a>
<a class="hover:text-white" href="#">Política de Privacidade</a>
<a class="hover:text-white" href="#">Compliance</a>
</div>
</div>
</div>
</footer>
</body></html>

<!-- Resident Portal Dashboard -->
<!DOCTYPE html>

<html lang="pt-PT"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Resident Portal Dashboard | imo.cv</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#137fec", // Atlantic Blue
              "success": "#10b981", // Emerald Green
              "background-light": "#f6f7f8",
              "background-dark": "#101922",
            },
            fontFamily: {
              "display": ["Manrope", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        body { font-family: 'Manrope', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .active-nav {
            background-color: rgba(19, 127, 236, 0.1);
            color: #137fec;
            border-left: 4px solid #137fec;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
<div class="flex min-h-screen">
<!-- Sidebar Navigation -->
<aside class="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col sticky top-0 h-screen">
<div class="p-6 flex items-center gap-3">
<div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined">apartment</span>
</div>
<div>
<h1 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">imo.cv</h1>
<p class="text-xs text-slate-500 font-medium uppercase tracking-wider">Resident Portal</p>
</div>
</div>
<nav class="flex-1 px-4 py-4 space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg active-nav group transition-colors" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-semibold text-sm">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">account_balance_wallet</span>
<span class="font-medium text-sm">Minhas Contas</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">campaign</span>
<span class="font-medium text-sm">Comunicados</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">calendar_today</span>
<span class="font-medium text-sm">Reserva de Áreas</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">how_to_vote</span>
<span class="font-medium text-sm">Votações</span>
</a>
</nav>
<div class="p-4 border-t border-slate-200 dark:border-slate-800">
<div class="bg-primary/5 dark:bg-primary/10 p-4 rounded-xl border border-primary/20">
<div class="flex items-center gap-3 mb-3">
<div class="w-8 h-8 rounded-full bg-slate-200" data-alt="User profile avatar circle" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBod4eb3UsgmpT-wwTlsp1i6blG5twtoZ4L-RasIgeqPVIsOFARa3eZXKW1Po0LjIG9bI7HRiG4HoErl5P8_e0CVeZ-wdAYn621dvzJVif68BRJOZeinvUsKf8pM6bZRz2_-MsOHmP4EnavtyEYtsJh89nShauAXWCOx_OZRc2MUGlCUFpre4mKzfBpvI6aH0nMDdrqYGYfe4Svkq2fzEmo6-wwusbB88I5VB8j5LoBKniEeLlEBScFcaDuxsbUO3H_EkJRM8NsYRg')"></div>
<div class="flex-1 overflow-hidden">
<p class="text-sm font-bold truncate">Unidade 402 - Bloco A</p>
<p class="text-xs text-slate-500 truncate">João Silva</p>
</div>
</div>
<button class="w-full py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all uppercase tracking-wide">
                        Configurações
                    </button>
</div>
</div>
</aside>
<!-- Main Content -->
<main class="flex-1 flex flex-col min-w-0">
<!-- Header -->
<header class="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
<div class="flex items-center gap-2 lg:hidden">
<span class="material-symbols-outlined text-slate-600">menu</span>
<span class="font-bold text-primary">imo.cv</span>
</div>
<div class="hidden md:block">
<h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">Bem-vindo, Residente</h2>
</div>
<div class="flex items-center gap-4">
<button class="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
</button>
<div class="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
<div class="flex items-center gap-3 cursor-pointer">
<span class="text-sm font-medium hidden sm:block">João Silva</span>
<span class="material-symbols-outlined text-slate-400">expand_more</span>
</div>
</div>
</header>
<!-- Dashboard Grid -->
<div class="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
<!-- Financial Overview & Summary Stats -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- 1) Saldo Atual Card -->
<div class="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
<div class="w-full md:w-48 h-32 bg-slate-50 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700">
<span class="text-primary material-symbols-outlined text-4xl mb-1">receipt_long</span>
<span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mês: Outubro</span>
</div>
<div class="flex-1 space-y-3 w-full">
<div class="flex justify-between items-start">
<div>
<p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Saldo Atual</p>
<h3 class="text-3xl font-extrabold text-slate-900 dark:text-white">450,00 <span class="text-lg font-medium text-slate-400">CV</span></h3>
</div>
<span class="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase">Pendente</span>
</div>
<p class="text-sm text-slate-600 dark:text-slate-400">Taxa Condominial referente ao mês de Outubro. Vencimento em: <span class="font-bold">10/10/2023</span></p>
<div class="flex gap-3 pt-2">
<button class="flex-1 md:flex-none px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-lg">payments</span>
                                    Pagar Agora
                                </button>
<button class="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
<span class="material-symbols-outlined text-slate-600 dark:text-slate-400">download</span>
</button>
</div>
</div>
</div>
<!-- Quick Status Widget -->
<div class="bg-success/10 dark:bg-success/5 p-6 rounded-xl border border-success/20 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<div class="p-2 bg-success/20 rounded-lg text-success">
<span class="material-symbols-outlined">verified_user</span>
</div>
<span class="text-[10px] font-bold text-success uppercase tracking-widest">Status Geral</span>
</div>
<h4 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">Você está em dia com o condomínio.</h4>
<p class="text-sm text-slate-600 dark:text-slate-400 mt-2">Nenhuma pendência anterior encontrada em sua unidade.</p>
</div>
<div class="mt-4 pt-4 border-t border-success/10">
<a class="text-success text-sm font-bold flex items-center gap-1 hover:underline" href="#">
                                Ver histórico financeiro
                                <span class="material-symbols-outlined text-xs">arrow_forward_ios</span>
</a>
</div>
</div>
</div>
<!-- Main Content Row -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- 2) Últimos Comunicados -->
<div class="lg:col-span-1 space-y-4">
<div class="flex items-center justify-between">
<h3 class="text-xl font-extrabold text-slate-900 dark:text-white">Comunicados</h3>
<a class="text-primary text-sm font-bold" href="#">Ver todos</a>
</div>
<div class="space-y-3">
<!-- Comunicado Item -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all cursor-pointer group">
<div class="flex gap-4">
<div class="w-12 h-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">engineering</span>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-1">
<h4 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">Manutenção do Elevador</h4>
<span class="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-2">Hoje</span>
</div>
<p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">O elevador social estará em manutenção preventiva das 14h às 16h no Bloco A.</p>
</div>
</div>
</div>
<!-- Comunicado Item -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all cursor-pointer group">
<div class="flex gap-4">
<div class="w-12 h-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">groups</span>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-1">
<h4 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">Próxima Assembleia</h4>
<span class="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-2">2 dias</span>
</div>
<p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">Convocação oficial para a assembleia extraordinária no dia 15/10 às 19h no salão de festas.</p>
</div>
</div>
</div>
<!-- Comunicado Item -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all cursor-pointer group">
<div class="flex gap-4">
<div class="w-12 h-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">pest_control</span>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-1">
<h4 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">Dedetização Áreas Comuns</h4>
<span class="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-2">5 dias</span>
</div>
<p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">Informamos que as áreas externas passarão por dedetização no próximo sábado.</p>
</div>
</div>
</div>
</div>
</div>
<!-- 3) Gráfico de Consumo -->
<div class="lg:col-span-2 space-y-4">
<div class="flex items-center justify-between">
<h3 class="text-xl font-extrabold text-slate-900 dark:text-white">Gráfico de Consumo</h3>
<div class="flex items-center gap-2">
<span class="flex items-center gap-1 text-[10px] font-bold uppercase text-primary">
<span class="w-2 h-2 rounded-full bg-primary"></span> Água
                                </span>
<span class="flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400">
<span class="w-2 h-2 rounded-full bg-slate-200"></span> Energia
                                </span>
</div>
</div>
<div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col h-full min-h-[300px]">
<div class="flex-1 flex items-end justify-between gap-4 px-2 pb-6 relative">
<!-- Grid Lines -->
<div class="absolute inset-0 flex flex-col justify-between py-6 opacity-5 pointer-events-none">
<div class="w-full h-px bg-slate-900"></div>
<div class="w-full h-px bg-slate-900"></div>
<div class="w-full h-px bg-slate-900"></div>
<div class="w-full h-px bg-slate-900"></div>
</div>
<!-- Bars (Simulated Chart) -->
<div class="flex-1 flex flex-col items-center gap-2 group">
<div class="w-full max-w-[40px] bg-primary/20 rounded-t-lg h-[40%] group-hover:bg-primary/40 transition-all"></div>
<span class="text-[10px] font-bold text-slate-400 uppercase">Mai</span>
</div>
<div class="flex-1 flex flex-col items-center gap-2 group">
<div class="w-full max-w-[40px] bg-primary/30 rounded-t-lg h-[60%] group-hover:bg-primary/50 transition-all"></div>
<span class="text-[10px] font-bold text-slate-400 uppercase">Jun</span>
</div>
<div class="flex-1 flex flex-col items-center gap-2 group">
<div class="w-full max-w-[40px] bg-primary/40 rounded-t-lg h-[55%] group-hover:bg-primary/60 transition-all"></div>
<span class="text-[10px] font-bold text-slate-400 uppercase">Jul</span>
</div>
<div class="flex-1 flex flex-col items-center gap-2 group">
<div class="w-full max-w-[40px] bg-primary/60 rounded-t-lg h-[80%] group-hover:bg-primary/80 transition-all"></div>
<span class="text-[10px] font-bold text-slate-400 uppercase text-primary">Ago</span>
</div>
<div class="flex-1 flex flex-col items-center gap-2 group">
<div class="w-full max-w-[40px] bg-primary/50 rounded-t-lg h-[70%] group-hover:bg-primary/70 transition-all"></div>
<span class="text-[10px] font-bold text-slate-400 uppercase">Set</span>
</div>
<div class="flex-1 flex flex-col items-center gap-2 group">
<div class="w-full max-w-[40px] bg-primary rounded-t-lg h-[95%] group-hover:brightness-110 transition-all relative">
<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">92m³</div>
</div>
<span class="text-[10px] font-black text-slate-900 dark:text-white uppercase">Out</span>
</div>
</div>
<div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
<div>
<p class="text-xs text-slate-500 font-medium">Consumo médio (6 meses)</p>
<p class="text-lg font-bold text-slate-900 dark:text-white">68.4 m³</p>
</div>
<div class="text-right">
<p class="text-xs text-slate-500 font-medium">Meta de Economia</p>
<p class="text-lg font-bold text-success">-12%</p>
</div>
</div>
</div>
</div>
</div>
<!-- Footer Quick Links -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
<button class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/20 transition-all group">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">deck</span>
<span class="text-xs font-bold text-slate-700 dark:text-slate-300">Churrasqueira</span>
</button>
<button class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/20 transition-all group">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">celebration</span>
<span class="text-xs font-bold text-slate-700 dark:text-slate-300">Salão de Festas</span>
</button>
<button class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/20 transition-all group">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">sports_tennis</span>
<span class="text-xs font-bold text-slate-700 dark:text-slate-300">Quadra</span>
</button>
<button class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/20 transition-all group">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">shield_person</span>
<span class="text-xs font-bold text-slate-700 dark:text-slate-300">Portaria 24h</span>
</button>
</div>
</div>
</main>
</div>
</body></html>

<!-- Resident Billing & Payments -->
<!DOCTYPE html>

<html lang="pt-PT"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Resident Announcements &amp; Messages - imo.cv</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#134dec",
                        "background-light": "#f6f6f8",
                        "background-dark": "#101522",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
<div class="relative flex h-auto min-h-screen w-full flex-col">
<div class="layout-container flex h-full grow flex-col">
<!-- Top Navigation Bar -->
<header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-10 py-3">
<div class="flex items-center gap-8">
<div class="flex items-center gap-4 text-primary">
<div class="size-8 flex items-center justify-center">
<span class="material-symbols-outlined text-3xl font-bold">domain</span>
</div>
<h2 class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">imo.cv Portal</h2>
</div>
<label class="flex flex-col min-w-64 !h-10">
<div class="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800">
<div class="text-slate-500 flex items-center justify-center pl-4">
<span class="material-symbols-outlined text-xl">search</span>
</div>
<input class="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-slate-500 px-4 text-sm font-normal" placeholder="Pesquisar comunicados..." value=""/>
</div>
</label>
</div>
<div class="flex flex-1 justify-end gap-8">
<div class="flex items-center gap-8">
<a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
<a class="text-primary text-sm font-bold border-b-2 border-primary py-1" href="#">Comunicados</a>
<a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Financeiro</a>
<a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Reservas</a>
</div>
<div class="flex gap-3">
<button class="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="flex items-center justify-center rounded-lg size-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors">
<span class="material-symbols-outlined">settings</span>
</button>
<div class="bg-primary/10 rounded-full border border-primary/20 p-0.5">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9" data-alt="User profile avatar circle" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkhbWlhvY4W3GEN1L5_tmwo6dbfTrheNueB545QG3gZBzjzTfPhKOfw0sW7Y_ZePNDYy3HZkObDqq5RLyMG41iAZ0vNIp35NSWKzgJnjx5rdV3_FRGBD2jsgluBQOrWhaNIsaH-q5zVQf-NTQ1I1O_2AskArPZdS46TNNnwjc4TS9vqlMVWPJK0IJLT2g43Yn9F9rCbvZvb9IeMgTNjztqo5V8Ih0dMFefGdbJKKZPbOk16KJ0_wSzxbXAPgISwSyTuuCT5CFpkxI");'></div>
</div>
</div>
</div>
</header>
<!-- Main Content Area: Master-Detail Split -->
<main class="flex h-[calc(100vh-64px)] overflow-hidden">
<!-- Sidebar: Announcement List -->
<aside class="w-1/3 min-w-[380px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col">
<div class="p-6 border-b border-slate-100 dark:border-slate-800">
<h1 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Mensagens e Avisos</h1>
<div class="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
<button class="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold whitespace-nowrap">Todos</button>
<button class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-200 transition-colors whitespace-nowrap">Urgente</button>
<button class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-200 transition-colors whitespace-nowrap">Informativo</button>
<button class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-200 transition-colors whitespace-nowrap">Manutenção</button>
</div>
</div>
<div class="flex-1 overflow-y-auto">
<!-- List Item: Active/Selected -->
<div class="relative p-6 bg-primary/5 dark:bg-primary/10 border-l-4 border-primary cursor-pointer transition-all">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] uppercase tracking-wider font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded">Manutenção</span>
<span class="text-xs text-slate-500">Hoje, 09:45</span>
</div>
<h3 class="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug">Interrupção no Fornecimento de Água - Bloco B</h3>
<p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">Informamos que devido a uma reparação urgente na coluna principal, o abastecimento será...</p>
</div>
<!-- List Item: Urgent Unread -->
<div class="relative p-6 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] uppercase tracking-wider font-extrabold text-red-600 bg-red-100 px-2 py-0.5 rounded">Urgente</span>
<div class="flex items-center gap-2">
<div class="size-2 rounded-full bg-primary animate-pulse"></div>
<span class="text-xs text-slate-500">14 Out 2023</span>
</div>
</div>
<h3 class="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug">Assembleia Geral Extraordinária - Nova Data</h3>
<p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">A reunião anteriormente agendada para o dia 20 foi movida para o dia 25 devido a conflitos...</p>
</div>
<!-- List Item: Info Read -->
<div class="relative p-6 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Informativo</span>
<span class="text-xs text-slate-500">12 Out 2023</span>
</div>
<h3 class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 leading-snug">Instalação de Novos Pontos de Carregamento Elétrico</h3>
<p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">Temos o prazer de anunciar que o projeto de sustentabilidade do condomínio avançou para...</p>
</div>
<!-- List Item: Regular Read -->
<div class="relative p-6 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all">
<div class="flex justify-between items-start mb-2">
<span class="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Informativo</span>
<span class="text-xs text-slate-500">10 Out 2023</span>
</div>
<h3 class="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 leading-snug">Relatório de Contas - Setembro 2023</h3>
<p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">O balancete financeiro relativo ao mês de Setembro já se encontra disponível para consulta...</p>
</div>
</div>
</aside>
<!-- Detail Pane: Reading View -->
<article class="flex-1 overflow-y-auto bg-white dark:bg-background-dark p-12">
<div class="max-w-3xl mx-auto">
<!-- Article Header -->
<header class="mb-10">
<div class="flex items-center gap-3 mb-6">
<span class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg uppercase tracking-widest">Manutenção</span>
<span class="text-slate-400 text-sm flex items-center gap-1">
<span class="material-symbols-outlined text-sm">calendar_today</span>
                                    15 de Outubro de 2023, às 09:45
                                </span>
</div>
<h1 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight mb-6">
                                Interrupção no Fornecimento de Água - Bloco B e Áreas Comuns
                            </h1>
<div class="flex items-center gap-4 py-4 border-y border-slate-100 dark:border-slate-800">
<div class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
<span class="material-symbols-outlined text-primary">admin_panel_settings</span>
</div>
<div>
<p class="text-sm font-bold text-slate-900 dark:text-slate-100">Administração Condomínio</p>
<p class="text-xs text-slate-500">Gestão de Infraestruturas</p>
</div>
</div>
</header>
<!-- Article Body -->
<section class="prose prose-slate dark:prose-invert max-w-none mb-12">
<p class="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6 font-medium">
                                Estimados residentes do Bloco B,
                            </p>
<p class="text-base leading-loose text-slate-600 dark:text-slate-400 mb-6">
                                Informamos que, devido a uma rotura detetada na coluna principal de abastecimento de água, será necessário proceder a uma intervenção técnica urgente no dia <b>16 de Outubro (segunda-feira)</b>.
                            </p>
<p class="text-base leading-loose text-slate-600 dark:text-slate-400 mb-6">
                                Prevê-se que o corte ocorra entre as <b>09:00 e as 13:00</b>. Esta medida é essencial para garantir a segurança da infraestrutura e evitar danos maiores nas garagens inferiores. As áreas comuns, incluindo a piscina e o ginásio, também poderão ser afetadas durante este período.
                            </p>
<div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-6 rounded-r-xl my-8">
<div class="flex gap-3">
<span class="material-symbols-outlined text-amber-600">tips_and_updates</span>
<p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
<b>Recomendação:</b> Aconselhamos os moradores a armazenarem uma reserva mínima de água para necessidades básicas durante este período e a certificarem-se de que todas as torneiras permanecem fechadas.
                                    </p>
</div>
</div>
</section>
<!-- Attachments Section -->
<section class="mb-12">
<h4 class="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-4">Documentos e Anexos</h4>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<!-- PDF Attachment -->
<div class="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
<div class="flex items-center gap-3">
<div class="size-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600">
<span class="material-symbols-outlined">picture_as_pdf</span>
</div>
<div>
<p class="text-sm font-bold text-slate-900 dark:text-slate-100">Plano_Intervencao.pdf</p>
<p class="text-xs text-slate-500">1.2 MB • Documento PDF</p>
</div>
</div>
<button class="text-slate-400 group-hover:text-primary">
<span class="material-symbols-outlined">download</span>
</button>
</div>
<!-- Image Attachment -->
<div class="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
<div class="flex items-center gap-3">
<div class="size-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
<span class="material-symbols-outlined">image</span>
</div>
<div>
<p class="text-sm font-bold text-slate-900 dark:text-slate-100">Local_Rotura_Foto.jpg</p>
<p class="text-xs text-slate-500">2.5 MB • Imagem</p>
</div>
</div>
<button class="text-slate-400 group-hover:text-primary">
<span class="material-symbols-outlined">download</span>
</button>
</div>
</div>
</section>
<!-- Confirmation Footer -->
<footer class="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-6">
<p class="text-sm text-slate-500 text-center max-w-md">
                                Ao clicar no botão abaixo, confirma que leu e compreendeu este comunicado. O seu histórico de leitura ajuda a administração a garantir que todos foram informados.
                            </p>
<button class="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.02] active:scale-95">
<span class="material-symbols-outlined">check_circle</span>
                                Confirmar Leitura
                            </button>
<div class="flex items-center gap-2 text-slate-400 text-xs">
<span class="material-symbols-outlined text-xs">visibility</span>
                                Lida por 142 de 200 residentes
                            </div>
</footer>
</div>
</article>
</main>
</div>
</div>
</body></html>

<!-- Resident Announcements & Messages -->
<!DOCTYPE html>

<html lang="pt"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv | Marketplace Discovery Portal</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#134dec",
                        "emerald-accent": "#10b981",
                        "sand-accent": "#f59e0b",
                        "background-light": "#f6f6f8",
                        "background-dark": "#101522",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
                },
            },
        }
    </script>
<style>
        body { font-family: 'Manrope', sans-serif; }
        .glass-effect {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
<!-- Top Navigation Bar -->
<header class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md">
<div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div class="flex items-center gap-10">
<a class="flex items-center gap-2 group" href="#">
<div class="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined text-2xl">domain</span>
</div>
<span class="text-2xl font-extrabold tracking-tight text-primary">imo.cv</span>
</a>
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Comprar</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Arrendar</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Férias</a>
<a class="text-sm font-semibold hover:text-primary transition-colors text-emerald-accent flex items-center gap-1" href="#">
<span class="material-symbols-outlined text-sm">auto_awesome</span> Lançamentos
                    </a>
</nav>
</div>
<div class="flex items-center gap-4">
<button class="flex items-center gap-2 px-4 py-2 text-sm font-bold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
<span class="material-symbols-outlined text-lg">language</span>
<span>PT/EN</span>
</button>
<button class="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    Entrar / Registar
                </button>
</div>
</div>
</header>
<main class="w-full">
<!-- Hero Section -->
<section class="relative h-[640px] w-full flex items-center justify-center px-6">
<div class="absolute inset-0 z-0 overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background-light dark:to-background-dark z-10"></div>
<img alt="Cape Verde Coastline" class="w-full h-full object-cover scale-105" data-alt="Drone shot of Cape Verdean coastline with turquoise water and white sand" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIHZ9LYaaXjKBaDqf4ip1ItztEREp4P38AXTj-g-QFPS1ShGi7_mnRYMSHvlATe3fJCc0Kj-J_UcfkZA94CAABIe6sUOSwXQ8N46848f3oTE3EZJUY9qPiolFlkwNtvzunZ1HRT0jKbrDPde1JKxvU2RDiuyLrkiDxYrQW2c6sTlpihkWCMft6yqofPM0_5uCdbjVfgde_uTJjPAH4LrLONJQf5G5HVb_O4WxBd1E8Axs2Rf6CUlo8NYw4YcQz9stytjBLkGuGvIY"/>
</div>
<div class="relative z-20 max-w-4xl w-full text-center space-y-8">
<div class="space-y-4">
<h1 class="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-md">
                        Encontre o seu lugar no <span class="text-sand-accent">Paraíso</span>
</h1>
<p class="text-lg text-white/90 font-medium max-w-2xl mx-auto drop-shadow-sm">
                        A plataforma líder para comprar, arrendar ou passar férias nas ilhas de Cabo Verde.
                    </p>
</div>
<!-- Hero Search Widget -->
<div class="bg-white/95 dark:bg-slate-900/95 p-2 rounded-2xl shadow-2xl backdrop-blur-sm">
<!-- Tab Selectors -->
<div class="flex items-center gap-2 p-1 border-b border-slate-100 dark:border-slate-800 mb-2">
<button class="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-primary text-white flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-lg">shopping_cart</span> Comprar
                        </button>
<button class="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-all">
<span class="material-symbols-outlined text-lg">key</span> Arrendar
                        </button>
<button class="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-all">
<span class="material-symbols-outlined text-lg">beach_access</span> Férias
                        </button>
<button class="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-all">
<span class="material-symbols-outlined text-lg">architecture</span> Lançamentos
                        </button>
</div>
<!-- Inputs -->
<div class="flex flex-col md:flex-row items-center gap-2 p-2">
<div class="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus-within:border-primary/30 transition-all">
<span class="material-symbols-outlined text-slate-400">location_on</span>
<input class="bg-transparent border-none focus:ring-0 w-full text-sm font-medium" placeholder="Ilha, cidade ou zona..." type="text"/>
</div>
<div class="w-full md:w-48 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus-within:border-primary/30 transition-all">
<span class="material-symbols-outlined text-slate-400">home_work</span>
<select class="bg-transparent border-none focus:ring-0 w-full text-sm font-medium">
<option>Tipo de Imóvel</option>
<option>Apartamento</option>
<option>Vivenda</option>
<option>Terreno</option>
</select>
</div>
<button class="w-full md:w-auto bg-primary text-white h-14 px-10 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined">search</span>
<span>Pesquisar</span>
</button>
</div>
</div>
</div>
</section>
<!-- Product Segments -->
<section class="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Segment 1 -->
<a class="group relative h-64 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300" href="#">
<img class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Luxury white villa with infinity pool overlooking the ocean" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAug_XPRC0f6RLo0ACwOLaG7zw7VLuK2JU7gmcNk0aAQ1ukMVAULmSrgLu3TeY7cbodOkvasAgPD1O3_ig7uOQaQdHVlVYurtAF8qK8Gqmy0SW4e-0xTG2npTUKeoQLPmqzXei01YygsQNNfCvFer6uQrdYMZdvdU8EKy5RpyHcP8XKlENd1xSflBvNdDTl4uGY8E7SQcxJvKolTkfItoWmJcyYvnQ6_a47gwzbeBnC5vkXh6j6yvMm1sIA-8MqqGWMcojUn-V0kBo"/>
<div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
<div class="absolute bottom-6 left-6 right-6">
<div class="bg-sand-accent/20 text-sand-accent w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-sm border border-sand-accent/30">Premium</div>
<h3 class="text-xl font-extrabold text-white">Villas de Luxo</h3>
<p class="text-white/70 text-xs font-medium mt-1">Exclusividade e conforto</p>
</div>
</a>
<!-- Segment 2 -->
<a class="group relative h-64 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300" href="#">
<img class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Modern high-rise apartment building in an urban setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9gPG_LHhmx4HP14XdwUXgEJbQQ4ko7Chdw4zMi4tMg5ml9gvjSIAdvyUVNE_XoyPtz_xMxmO8i5VUj8qhktm5v2MnGZTTr-jX8jCGIM2cU8rMP5ycM3G8dYK5KzIZuC-AeTpFv6wUk60GDOR0lgTI-2GuMAwwoRTBQR5_nleKhYsBydsd_NmT2wV6cWuKFnFys5wg3Lv_dbauEuqIcYEKRb-BSC4lJ8SepLz6AUnPBUbGOxw7dqfVjpnWNqFR8YPI3FhMAMI_sTg"/>
<div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
<div class="absolute bottom-6 left-6 right-6">
<div class="bg-primary/20 text-blue-300 w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-sm border border-primary/30">Urbano</div>
<h3 class="text-xl font-extrabold text-white">Apartamentos Cidade</h3>
<p class="text-white/70 text-xs font-medium mt-1">Praia e Mindelo</p>
</div>
</a>
<!-- Segment 3 -->
<a class="group relative h-64 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300" href="#">
<img class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Small cozy beach hut on a sunny tropical beach" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADUireg9aPABijOmDPO8evIqY2agY2K2r08-z8aAl7XT8u6KaLy-45lrpq2YOapG2B5a-ZkDFZCji7-meMyhAAyIdoWKep0xfLdHwW94EsjA1GDMiULPbE-hmd9prhyVUUftR0EDn3VsFPxFXO6tdN8tn6ofII5W2PocEN1nYg2JLZ3kL6thGielyYvij8pD73BColdvhd85WCKlQozrM9sz6OyKxHP_IAvRU_oH8W3lSGFuE2IqgxPtdN0J54fAN8Utp5Dxmpigg"/>
<div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
<div class="absolute bottom-6 left-6 right-6">
<div class="bg-orange-500/20 text-orange-300 w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-sm border border-orange-500/30">Férias</div>
<h3 class="text-xl font-extrabold text-white">Casas de Férias</h3>
<p class="text-white/70 text-xs font-medium mt-1">Escapadinha perfeita</p>
</div>
</a>
<!-- Segment 4 -->
<a class="group relative h-64 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300" href="#">
<img class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Architectural render of a modern sustainable residential project" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCUt45nqPBpuaXMJdYIw81ibPp2VaTJDVuQxZh2ihlA242VQ2743QB_GcDXXPXLblBGJSL5l4yGYCPsXz11PlKiO4QehlhFFIh6246gAh39VQx9c9ocbkugsdLY3vH_oAgb9o-wSLNDbIQVwD4TAdLdHqd_02B7RZaU4m5nOTwZmSq45Ky5YhowkAHi0a5pKTrKjfEBECvmJpGmwCONhHdw0PYDn-hXB3LY4NyLHrsEFfdmxY0Ad2mKcn5fdmetBaeLZO2WbuT0NE"/>
<div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
<div class="absolute bottom-6 left-6 right-6">
<div class="bg-emerald-accent/20 text-emerald-accent w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-sm border border-emerald-accent/30">Novo</div>
<h3 class="text-xl font-extrabold text-white">Obras Novas</h3>
<p class="text-white/70 text-xs font-medium mt-1">Projetos em construção</p>
</div>
</a>
</div>
</section>
<!-- Featured Grid -->
<section class="max-w-7xl mx-auto px-6 py-20">
<div class="flex items-end justify-between mb-10">
<div class="space-y-2">
<h2 class="text-3xl font-extrabold tracking-tight">Imóveis em Destaque</h2>
<p class="text-slate-500 dark:text-slate-400 font-medium">As melhores oportunidades selecionadas para si.</p>
</div>
<a class="text-primary font-bold flex items-center gap-2 group" href="#">
                    Ver todos os imóveis
                    <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Listing 1: Luxury Villa -->
<div class="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow group">
<div class="relative h-64">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Luxury coastal estate in Sal island with modern architecture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmiIjtjMR4H6_H7Ow9shZfquICiJMdvnVmla_g9hCG3D7yt4dMQAvQbm3J2FyuZfdZRxvhjtSOxRRMjIeKKMg37UQQI7XcLOmhYakr3SHd3rFgXX9wl5N49-TZM5LzPlvB6vdjkRpYnbZRllmitqoVfZjXrJ7iJU-zOuQEiMQkKR0hu9_sy0grOBWLAn4Y75SUZ043u1E7msntYJaqz2ZEpcgNt8-5WJgIMkLVjE2QRe67gBMUCleDlANsj1DmPiP3kR_W5_LTlKY"/>
<div class="absolute top-4 left-4 flex gap-2">
<span class="bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
<span class="material-symbols-outlined text-xs">verified</span> Verificado
                            </span>
</div>
<button class="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-full hover:bg-white transition-colors">
<span class="material-symbols-outlined text-slate-900 dark:text-white">favorite</span>
</button>
</div>
<div class="p-6 space-y-4">
<div class="flex justify-between items-start">
<div>
<p class="text-primary text-xs font-bold uppercase tracking-widest mb-1">Ilha do Sal</p>
<h4 class="text-xl font-bold">Villa Atlantic Azure</h4>
</div>
<div class="text-right">
<p class="text-2xl font-black text-slate-900 dark:text-white">€850.000</p>
<p class="text-[10px] text-slate-400 font-bold uppercase">Preço de Venda</p>
</div>
</div>
<div class="flex items-center gap-4 py-4 border-y border-slate-50 dark:border-slate-800">
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">bed</span>
<span class="text-sm font-bold">4</span>
</div>
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">bathtub</span>
<span class="text-sm font-bold">3</span>
</div>
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">straighten</span>
<span class="text-sm font-bold">320m²</span>
</div>
</div>
<button class="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">Ver Detalhes</button>
</div>
</div>
<!-- Listing 2: New Construction Render -->
<div class="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow group">
<div class="relative h-64">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern apartment building render in Praia city center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAif5jK-wYdPnprel9J5XoXil_wDTDdmJAs9wJosH3WxKKjt2dIWdI5pF8EbsKB748oTcitQywJuw89qNzzpXHh9EtiiSNkzGm0URpVuoclGD3Kvn8FoV_6Svo_YvNZLJ4IbdL8ijexqmbXxEGxmZ44sQK5Z0s9pR2JsIg5GXOLe6AozusEzwQCEmtyvFFhwJYc_E5iQysMOa-4b8QMOsUTZCphuMLQiy1PFzC5C1gbFjKxksjp4MfL-CYklEP00bA4Xg367lp59z8"/>
<div class="absolute top-4 left-4 flex gap-2">
<span class="bg-emerald-accent text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg">Lançamento</span>
</div>
<div class="absolute bottom-4 left-4">
<div class="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg">Pronto em Dez 2025</div>
</div>
</div>
<div class="p-6 space-y-4">
<div class="flex justify-between items-start">
<div>
<p class="text-emerald-accent text-xs font-bold uppercase tracking-widest mb-1">Praia, Santiago</p>
<h4 class="text-xl font-bold">Oasis City Residence</h4>
</div>
<div class="text-right">
<p class="text-2xl font-black text-slate-900 dark:text-white">€145.000</p>
<p class="text-[10px] text-slate-400 font-bold uppercase">Desde</p>
</div>
</div>
<div class="flex items-center gap-4 py-4 border-y border-slate-50 dark:border-slate-800">
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">apartment</span>
<span class="text-sm font-bold">T2 - T3</span>
</div>
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">pool</span>
<span class="text-sm font-bold">Comum</span>
</div>
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">energy_savings_leaf</span>
<span class="text-sm font-bold">Eco-A+</span>
</div>
</div>
<button class="w-full bg-emerald-accent text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all">Solicitar Brochura</button>
</div>
</div>
<!-- Listing 3: Vacation Rental -->
<div class="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow group">
<div class="relative h-64">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Beachfront resort apartment in Boavista for vacation rental" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYI-_Iqe58ELVGK5vxTSTT3u5LXip27Fnf8h0QTuzKavi2mU8VpwixiOsg3GloZ71fRoaeM_b82hKHTPfLMXDwR03x1Kv1xfPRkfP9_OODU58RD9h5Qsj-BZODUGh-f71191I4xu8_5dOGMJdSwQsbz9FSsWmR319WCmL6uC-zjrQCbUUkLKJ8huUX5yiSGbXLQ9o-k_iK2LZh28tb3REcrpKwAR5-i5fnNm3DD8AySs3KoagAEyEjVXxae3REodDRR49iwAJQbUU"/>
<div class="absolute top-4 left-4 flex gap-2">
<span class="bg-sand-accent text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg">Férias</span>
</div>
<div class="absolute bottom-4 right-4">
<div class="bg-white dark:bg-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-xl shadow-md border border-slate-100 dark:border-slate-700">
<span class="material-symbols-outlined text-sand-accent text-lg" style="font-variation-settings: 'FILL' 1">star</span>
<span class="text-sm font-extrabold">4.9</span>
<span class="text-[10px] text-slate-400 font-bold">(128)</span>
</div>
</div>
</div>
<div class="p-6 space-y-4">
<div class="flex justify-between items-start">
<div>
<p class="text-sand-accent text-xs font-bold uppercase tracking-widest mb-1">Boa Vista</p>
<h4 class="text-xl font-bold">Beachfront Penthouse</h4>
</div>
<div class="text-right">
<p class="text-2xl font-black text-slate-900 dark:text-white">€120</p>
<p class="text-[10px] text-slate-400 font-bold uppercase">Por Noite</p>
</div>
</div>
<div class="flex items-center gap-4 py-4 border-y border-slate-50 dark:border-slate-800">
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">group</span>
<span class="text-sm font-bold">Até 4 pax</span>
</div>
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">wifi</span>
<span class="text-sm font-bold">Grátis</span>
</div>
<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
<span class="material-symbols-outlined text-xl">ac_unit</span>
<span class="text-sm font-bold">Ar Cond.</span>
</div>
</div>
<button class="w-full bg-slate-900 dark:bg-slate-700 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Reservar Agora</button>
</div>
</div>
</div>
</section>
<!-- Seller CTA Section -->
<section class="max-w-7xl mx-auto px-6 pb-20">
<div class="bg-primary rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center relative shadow-2xl">
<!-- Abstract pattern decoration -->
<div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
<svg class="w-full h-full" viewbox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
<path d="M0,400 L400,0 L400,400 Z" fill="white"></path>
</svg>
</div>
<div class="flex-1 p-10 lg:p-16 space-y-8 z-10">
<div class="space-y-4">
<h2 class="text-4xl lg:text-5xl font-extrabold text-white leading-tight">Quer vender o seu imóvel?</h2>
<p class="text-xl text-white/80 font-medium max-w-xl">Anuncie com os melhores agentes do país e alcance milhares de compradores internacionais todos os dias.</p>
</div>
<div class="flex flex-wrap gap-4">
<button class="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-sand-accent hover:text-white transition-all shadow-xl">Anunciar Agora</button>
<button class="bg-primary/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">Saber mais</button>
</div>
<div class="flex items-center gap-8 pt-4">
<div class="flex -space-x-3">
<img alt="Agent" class="size-12 rounded-full border-2 border-primary object-cover" data-alt="Portrait of a professional real estate agent" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAo5Mi87yNwNxNMQuwVHg7s4dZuDZQTDvCoZZA5oecXoGz2lIYzTiQ6aOjoNKsakmjgNhOmSNXGgJyjIWHO3tCyQCqAUIFw4M_TztwLWNEnGNHwGwi1w6oKSrP2NNd-WYV20BgX68-dWvdd-VH1w-zRNNnnoXVjasDhUFMsFMC8nPF1YmcZiPMrE7qZPDyBcL0x8K_WLFZWZ-Ci87-g4dwn7H-9itiT6Fsrawc_NDKvFZ21_Uct2sTD8bsFXEXo0alX8aB1DnRfg4"/>
<img alt="Agent" class="size-12 rounded-full border-2 border-primary object-cover" data-alt="Portrait of a smiling real estate expert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmmqJOGiAcpQ8VS3zrY64CNuSw_kziFYNsJy4OPpw-KzEnGALVyui_OVpV2fkNm-2YPGT63Rm1_z6oC6UGqGi4GEuxbVuC-Pr7AZGII3HlhVbLNhSSWpSe4GFIInKEtpuLqA_YbOEzUQGRpSSDnOtTwbUMMw0ArYk879DHIx_Jh0OvVyJspKa7qMKmpEMREv5ZvJBpryx_VtLnG7hoS38v6NK09-EW8oPxr84b2SxNZL-EUQXj3X5p8zPJUKqbxhh8DUYjeKOjGE8"/>
<img alt="Agent" class="size-12 rounded-full border-2 border-primary object-cover" data-alt="Portrait of a female property specialist" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHN58vdUuLe1yjxRC2_VAOUFLCbEcCZakc1lDBYhisy-GkHqI-f5xJ-ckK2KLrRVjBWzqgi-X6vUL9Z4hIkr08C0t8Wq-LURE3wwq-24aPMnTjELsNwhyuKX7q_ZkqdfLXdPJFfAszXl66vP_vcGI3brx21GEn6OETVNnw6ITN1jNwBnUt3tb6BRTmmPsxiIg4ArccuWQGt8j2nFFJTSfapT_K7CpcxoBe9wIfnT96oR08EpwHGGWkrDnrj9bEzUh9j03oKGz1w7E"/>
</div>
<p class="text-white font-bold text-sm">+500 Especialistas ativos</p>
</div>
</div>
<div class="hidden lg:block w-[400px] h-full overflow-hidden self-stretch">
<img class="w-full h-full object-cover" data-alt="Close up of a real estate agent showing keys to a property" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr8CA1xb5qgeHMK4-ACNVUMgJrpDdPWcYODUbErKxi3QpcxHPjim6xOQudEPBwC6NaVtFoPq7KR-BrhCPEgP69ejUVy06up-udcbzS77mqnMMQeKyUcmuqY5OoVqweJd43K-wyAtV7rbzmtFF9odYQ9i9i3YYzRv4CtdakPWAwK1pc53lUqzyMY469VbvQT6QulbvvXOXmD1UpxP6AxMian26FBDzYUsJ1SAL5X3NNEV-JkNdRVcTmO1KvFVM_ZQPPV0lNQ-UsQec"/>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-16">
<div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
<div class="space-y-6">
<a class="flex items-center gap-2" href="#">
<div class="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined text-xl">domain</span>
</div>
<span class="text-xl font-extrabold tracking-tight text-primary">imo.cv</span>
</a>
<p class="text-sm text-slate-500 font-medium">A sua porta de entrada única para o mercado imobiliário em Cabo Verde. Transparência, confiança e inovação em cada negócio.</p>
<div class="flex gap-4">
<a class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
<span class="material-symbols-outlined text-xl">share</span>
</a>
<a class="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
<span class="material-symbols-outlined text-xl">mail</span>
</a>
</div>
</div>
<div>
<h5 class="font-bold mb-6">Comprar &amp; Arrendar</h5>
<ul class="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
<li><a class="hover:text-primary" href="#">Apartamentos na Praia</a></li>
<li><a class="hover:text-primary" href="#">Villas no Sal</a></li>
<li><a class="hover:text-primary" href="#">Terrenos para Construção</a></li>
<li><a class="hover:text-primary" href="#">Escritórios e Lojas</a></li>
</ul>
</div>
<div>
<h5 class="font-bold mb-6">Apoio ao Cliente</h5>
<ul class="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
<li><a class="hover:text-primary" href="#">Guia do Comprador</a></li>
<li><a class="hover:text-primary" href="#">Processo de Visto</a></li>
<li><a class="hover:text-primary" href="#">Seguro de Imóvel</a></li>
<li><a class="hover:text-primary" href="#">Contactos</a></li>
</ul>
</div>
<div>
<h5 class="font-bold mb-6">Newsletter</h5>
<p class="text-sm text-slate-500 mb-4 font-medium">Receba as melhores oportunidades diretamente no seu email.</p>
<div class="flex flex-col gap-3">
<input class="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary transition-all" placeholder="O seu melhor email" type="email"/>
<button class="bg-slate-900 dark:bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-primary transition-all">Subscrever</button>
</div>
</div>
</div>
<div class="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
<p>© 2024 imo.cv Marketplace. Todos os direitos reservados.</p>
<div class="flex gap-8">
<a class="hover:text-slate-900 dark:hover:text-white" href="#">Termos e Condições</a>
<a class="hover:text-slate-900 dark:hover:text-white" href="#">Privacidade</a>
<a class="hover:text-slate-900 dark:hover:text-white" href="#">Cookies</a>
</div>
</div>
</footer>
</body></html>

<!-- Marketplace Discovery Portal -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>New Construction Search | imo.cv Marketplace</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#134dec",
                        "background-light": "#f6f6f8",
                        "background-dark": "#101522",
                        "slate-custom": "#64748b",
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body { font-family: 'Manrope', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
<!-- Top Navigation -->
<header class="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between">
<div class="flex items-center gap-8">
<div class="flex items-center gap-2 text-primary">
<span class="material-symbols-outlined text-3xl font-bold">domain</span>
<h1 class="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">imo.cv <span class="text-primary/70 font-medium lowercase">Marketplace</span></h1>
</div>
<nav class="hidden lg:flex items-center gap-6">
<a class="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Buy</a>
<a class="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Rent</a>
<a class="text-sm font-semibold text-primary border-b-2 border-primary pb-1" href="#">Obras Novas</a>
<a class="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Developers</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden md:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
<input class="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary" placeholder="Search developments..." type="text"/>
</div>
<button class="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
<span class="material-symbols-outlined text-lg">add_circle</span>
                Post Listing
            </button>
<div class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-primary/20">
<img alt="User" data-alt="User profile avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx1JXWCHb45vxaUXsJPbLW_VWiBWVPX3mB_ED_zkcRXcUkEHae7rblvxhgFz_XJy4uxNENfMh_dAmQO8hizbXW4PtctHfSY9FM9Hwo5ymYZ3rKX2wnTZw4ak2VgcJ2t0RByE7zv--8KSF9Wwysd5Lnqr_jtkW7Mt8wpOBN7A0K7cqlMqN8dekLSjPXtDugU38YGb9t2zRd_wOn__s4HbPE1d8Okp1Y2PDXX5nPwqEqoAz5RwpUEYF2aMsrIiD9oYT_rbaQEVyQi10"/>
</div>
</div>
</header>
<!-- Filter Bar -->
<div class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 overflow-x-auto hide-scrollbar">
<div class="flex items-center gap-3 min-w-max">
<button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium hover:border-primary transition-colors">
<span class="material-symbols-outlined text-lg text-primary">foundation</span>
                Construction Stage
                <span class="material-symbols-outlined text-lg">keyboard_arrow_down</span>
</button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium hover:border-primary transition-colors">
<span class="material-symbols-outlined text-lg text-primary">business</span>
                Developer
                <span class="material-symbols-outlined text-lg">keyboard_arrow_down</span>
</button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium hover:border-primary transition-colors">
<span class="material-symbols-outlined text-lg text-primary">event</span>
                Completion Date
                <span class="material-symbols-outlined text-lg">keyboard_arrow_down</span>
</button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium hover:border-primary transition-colors">
<span class="material-symbols-outlined text-lg text-primary">payments</span>
                Price Range
                <span class="material-symbols-outlined text-lg">keyboard_arrow_down</span>
</button>
<div class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg text-primary font-bold text-sm hover:bg-primary/5 transition-colors">
<span class="material-symbols-outlined text-lg">tune</span>
                More Filters
            </button>
</div>
</div>
<!-- Main Content: Split View -->
<main class="flex h-[calc(100vh-124px)] overflow-hidden">
<!-- Left Column: Results -->
<section class="w-full lg:w-[480px] xl:w-[560px] h-full overflow-y-auto bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
<div class="p-6">
<div class="flex items-center justify-between mb-6">
<div>
<h2 class="text-2xl font-extrabold tracking-tight">Obras Novas em Santiago</h2>
<p class="text-slate-500 text-sm">42 newly built developments found</p>
</div>
<button class="text-slate-500 hover:text-primary transition-colors">
<span class="material-symbols-outlined">sort</span>
</button>
</div>
<!-- Development Cards Container -->
<div class="space-y-6">
<!-- Card 1 -->
<div class="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all bg-white dark:bg-slate-800">
<div class="relative h-56 overflow-hidden">
<img alt="Ocean View Residences" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern 3D architectural render of oceanfront apartment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC_YprFo1gEVOpNg-i7A0K1moM_RHVWwwuKEFaO7gbsoYP-qCmbG9z19KTnyLfehsR8nP5WDNqtNmRM94gqpCRbzkKriN4io8xH9NM1FNWMJsBhUqxjF1ZK39yVIwTi4VnXDc0Ge3S8DEfB9rfdl4bQQzPlX5VOC-vAdndzLCmJkiIiaiOIbrAgXrNOiWRKC5rq8XoccNQVSeVBR5H4D_aABBCoDRYHlLKEQE6l87pJmJ8m_kDgTrmUtn1u-WptPdH1THXHyW4PK4"/>
<div class="absolute top-3 left-3 flex gap-2">
<span class="bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Finishing Stage</span>
<span class="bg-emerald-500/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Q4 2024</span>
</div>
<div class="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-1 rounded-lg">
<img alt="Developer Logo" class="h-6 w-auto" data-alt="Corporate developer logo placeholder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ-Bo8lmqLkoIoe1uKzKLk1fU5BHgMgZjCH9MMZUqsNWte10_bw9q4T5k00SWwlIgAgqfNbbW_k4tOCXWw9-9mYzshf6BqoL8f7ZdhwwBp4ycMc6wf2VjPoShKKZXGI2ztehUy6_1WcRVV0C3AsRpog85yGRYFlzTvEZ43g526DwipyHoJoXVZ_RjGIfGdDeQtuOE9kr7rlVLKrW0P35fF-5FK4o7EuLM3OSXvtwrPbuTTOfQxpKRYRqOsHV-MSPcaTXQdie9A_kc"/>
</div>
</div>
<div class="p-5">
<div class="flex justify-between items-start mb-2">
<div>
<h3 class="text-lg font-bold group-hover:text-primary transition-colors leading-tight">Ocean View Residences</h3>
<p class="text-slate-500 text-sm flex items-center gap-1">
<span class="material-symbols-outlined text-sm">location_on</span>
                                        Prainha, Praia • BuildCorp CV
                                    </p>
</div>
<div class="text-right">
<p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Starting from</p>
<p class="text-primary font-extrabold text-lg">12.500.000 CVE</p>
</div>
</div>
<div class="mt-4 space-y-2">
<div class="flex justify-between text-xs font-bold">
<span class="text-slate-600 dark:text-slate-400">Construction Progress</span>
<span class="text-primary">85%</span>
</div>
<div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
<div class="bg-primary h-full rounded-full" style="width: 85%"></div>
</div>
</div>
<div class="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
<div class="flex gap-4">
<div class="flex items-center gap-1 text-slate-500">
<span class="material-symbols-outlined text-lg">bed</span>
<span class="text-xs font-semibold">T2 - T4</span>
</div>
<div class="flex items-center gap-1 text-slate-500">
<span class="material-symbols-outlined text-lg">pool</span>
<span class="text-xs font-semibold">Clubhouse</span>
</div>
</div>
<button class="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                                    Details
                                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all bg-white dark:bg-slate-800">
<div class="relative h-56 overflow-hidden">
<img alt="Santiago Skyline Suites" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="3D render of a technical modern complex with structural foundation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw5aFEs8h4btq2s4flJx5Vvf4lGLlzXQWn0xWxc4NL77V75zg_ptUq6M3iEtmBM7Ema-sGcG2m28UOOk63OGvB0I5uegSJB0Q4smGlXpygtTkLvAAt22OMcCxjEYgPDllzKiop-BOUR_YgnGs5MQxDYAxbyK0cDKqYJvw75qmiAf51rZnT0lEhbNzUQaHjac0yP-xlpPVQPEe8RP2EkIOYx4T3s4zjQvpUTFSEC-Kr4hXxy7gb8ImVKR8ABBA7qgvmjpimfPxlcsI"/>
<div class="absolute top-3 left-3 flex gap-2">
<span class="bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Foundation Stage</span>
<span class="bg-slate-500/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Q2 2026</span>
</div>
</div>
<div class="p-5">
<div class="flex justify-between items-start mb-2">
<div>
<h3 class="text-lg font-bold group-hover:text-primary transition-colors leading-tight">Santiago Skyline Suites</h3>
<p class="text-slate-500 text-sm flex items-center gap-1">
<span class="material-symbols-outlined text-sm">location_on</span>
                                        Achada Santo António • Atlantic Devs
                                    </p>
</div>
<div class="text-right">
<p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Starting from</p>
<p class="text-primary font-extrabold text-lg">9.800.000 CVE</p>
</div>
</div>
<div class="mt-4 space-y-2">
<div class="flex justify-between text-xs font-bold">
<span class="text-slate-600 dark:text-slate-400">Construction Progress</span>
<span class="text-primary">15%</span>
</div>
<div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
<div class="bg-primary h-full rounded-full" style="width: 15%"></div>
</div>
</div>
<div class="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
<div class="flex gap-4">
<div class="flex items-center gap-1 text-slate-500">
<span class="material-symbols-outlined text-lg">home</span>
<span class="text-xs font-semibold">Lofts - T2</span>
</div>
<div class="flex items-center gap-1 text-slate-500">
<span class="material-symbols-outlined text-lg">fitness_center</span>
<span class="text-xs font-semibold">Gym</span>
</div>
</div>
<button class="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                                    Details
                                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Card 3 -->
<div class="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all bg-white dark:bg-slate-800">
<div class="relative h-56 overflow-hidden">
<img alt="Planalto Premium" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="High-end skyscraper render in Cape Verde" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwGyCmRVvXEWXo-aC0SlNYEgXvpw1QGqDwvC2zbxhKTglZ5fjcVnKB4ymwnwj1sy8FxxRW9cLrpAntX6bsHNHYfAvz2HrvJk8lxmD-NLB5woLVEvpf8m1rwdsGBy_v3UCA7Mz3JJhgW8WJedEgjIaHGIcXciU6gb0XjN3ZWl8tNPPLqP8KVPWXfMfrjQ2Qy35MMLAf-A4om60d1p10VsCUqI-0IwJKtteaVwbnDU2FGEbLu1YE5lnmnojVNT16era616UwmqPz5Z8"/>
<div class="absolute top-3 left-3 flex gap-2">
<span class="bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Structural Phase</span>
<span class="bg-emerald-500/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Q1 2025</span>
</div>
</div>
<div class="p-5">
<div class="flex justify-between items-start mb-2">
<div>
<h3 class="text-lg font-bold group-hover:text-primary transition-colors leading-tight">Planalto Premium</h3>
<p class="text-slate-500 text-sm flex items-center gap-1">
<span class="material-symbols-outlined text-sm">location_on</span>
                                        Palmarejo Baixo • Cape Homes
                                    </p>
</div>
<div class="text-right">
<p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Starting from</p>
<p class="text-primary font-extrabold text-lg">15.200.000 CVE</p>
</div>
</div>
<div class="mt-4 space-y-2">
<div class="flex justify-between text-xs font-bold">
<span class="text-slate-600 dark:text-slate-400">Construction Progress</span>
<span class="text-primary">45%</span>
</div>
<div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
<div class="bg-primary h-full rounded-full" style="width: 45%"></div>
</div>
</div>
<div class="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
<div class="flex gap-4">
<div class="flex items-center gap-1 text-slate-500">
<span class="material-symbols-outlined text-lg">garage</span>
<span class="text-xs font-semibold">2 Parking</span>
</div>
<div class="flex items-center gap-1 text-slate-500">
<span class="material-symbols-outlined text-lg">security</span>
<span class="text-xs font-semibold">24h CCTV</span>
</div>
</div>
<button class="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                                    Details
                                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Right Column: Map -->
<section class="hidden lg:block flex-1 relative bg-slate-200 dark:bg-slate-800">
<!-- Simulated Map View -->
<div class="absolute inset-0 grayscale contrast-125 opacity-40 mix-blend-multiply pointer-events-none" data-alt="Monochrome topographical map of Santiago island" data-location="Santiago, Cape Verde" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDR4IuK89Vfupks3o81M0_aZmuSvCSUOhQqGOxm5s3UXlsrJXbIPjx2D8qWvfcbVPZy_HdEdkVJF-sWUS_FvcEgNT9dp7wxRlfXEERufW5QKgUk6HJcYMuV_jCRnyuRK2ZltD1feTsI4Ubb-UsZCN8Amw9W50YMhuCMSZJP2EbfzRTLj4zq8EniNxjhMWYr9Cc8_VRvFH8CwAYDvzIiMq0QPwCPprX9vVhxWm6CX7XCVNiSXNUG7w026bad6OvMm7fpemw0hoswBq4'); background-size: cover; background-position: center;">
</div>
<div class="absolute inset-0 bg-primary/5"></div>
<!-- Map Controls -->
<div class="absolute top-4 right-4 flex flex-col gap-2">
<button class="bg-white dark:bg-slate-900 size-10 rounded-lg shadow-lg flex items-center justify-center hover:text-primary transition-colors">
<span class="material-symbols-outlined">add</span>
</button>
<button class="bg-white dark:bg-slate-900 size-10 rounded-lg shadow-lg flex items-center justify-center hover:text-primary transition-colors">
<span class="material-symbols-outlined">remove</span>
</button>
<button class="bg-white dark:bg-slate-900 size-10 rounded-lg shadow-lg flex items-center justify-center hover:text-primary transition-colors mt-4">
<span class="material-symbols-outlined">my_location</span>
</button>
</div>
<!-- Custom Map Pins (Simulated) -->
<!-- Prainha Area -->
<div class="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
<div class="relative group cursor-pointer">
<div class="bg-primary text-white font-bold text-xs px-2 py-1 rounded shadow-lg flex items-center gap-1 animate-pulse">
<span class="material-symbols-outlined text-sm">home</span>
                        Ocean View
                    </div>
<div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary mx-auto"></div>
</div>
</div>
<!-- Cluster Pin -->
<div class="absolute top-[60%] left-[45%]">
<div class="bg-primary/20 p-4 rounded-full border border-primary/40 flex items-center justify-center">
<div class="size-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-xl">
                        12
                    </div>
</div>
</div>
<!-- Achada area -->
<div class="absolute top-[40%] left-[40%]">
<div class="relative group cursor-pointer opacity-80">
<div class="bg-slate-900 text-white font-bold text-xs px-2 py-1 rounded shadow-lg flex items-center gap-1">
                        Achada Skyline
                    </div>
<div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-900 mx-auto"></div>
</div>
</div>
<!-- Map Legend/Overlay -->
<div class="absolute bottom-6 left-6 right-6">
<div class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-2xl flex items-center justify-between">
<div class="flex items-center gap-6">
<div class="flex items-center gap-2">
<span class="size-3 rounded-full bg-primary"></span>
<span class="text-xs font-bold uppercase tracking-tight">Active Project</span>
</div>
<div class="flex items-center gap-2">
<span class="size-3 rounded-full bg-amber-500"></span>
<span class="text-xs font-bold uppercase tracking-tight">Foundation</span>
</div>
<div class="flex items-center gap-2">
<span class="size-3 rounded-full bg-emerald-500"></span>
<span class="text-xs font-bold uppercase tracking-tight">Ready Soon</span>
</div>
</div>
<div class="hidden md:block">
<p class="text-[10px] text-slate-500 font-medium">Map data © 2024 CartoCV. Satellite imagery from Airbus.</p>
</div>
</div>
</div>
</section>
</main>
<!-- Mobile Action Button (Only visible on small screens) -->
<div class="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden">
<button class="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold transition-transform active:scale-95">
<span class="material-symbols-outlined">map</span>
            Show Map
        </button>
</div>
</body></html>

<!-- New Construction Search View -->
<!DOCTYPE html>

<html lang="pt"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv - Vacation Rentals Search</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f4af25",
                        "background-light": "#f8f7f5",
                        "background-dark": "#221c10",
                    },
                    fontFamily: {
                        "display": ["Plus Jakarta Sans", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "1rem",
                        "xl": "1.5rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body {
            font-family: "Plus Jakarta Sans", sans-serif;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
<!-- Top Navigation Bar -->
<header class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
<div class="max-w-[1440px] mx-auto px-4 lg:px-10 h-20 flex items-center justify-between gap-8">
<!-- Logo -->
<div class="flex items-center gap-2 shrink-0">
<div class="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined text-2xl font-bold">holiday_village</span>
</div>
<h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">imo.cv</h1>
</div>
<!-- Central Search (Collapsed) -->
<div class="hidden md:flex flex-1 max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full py-2 px-6 items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
<div class="flex flex-1 divide-x divide-slate-200 dark:divide-slate-700">
<div class="px-4 text-sm font-semibold">Cabo Verde</div>
<div class="px-4 text-sm font-semibold text-slate-500">Qualquer semana</div>
<div class="px-4 text-sm font-normal text-slate-400">Hóspedes?</div>
</div>
<div class="size-8 bg-primary rounded-full flex items-center justify-center text-white ml-2">
<span class="material-symbols-outlined text-lg">search</span>
</div>
</div>
<!-- User Menu -->
<div class="flex items-center gap-4">
<a class="hidden lg:block text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-full transition-colors" href="#">Anuncie a sua casa</a>
<button class="flex items-center gap-3 p-1 pl-3 border border-slate-200 dark:border-slate-700 rounded-full bg-white dark:bg-slate-900 hover:shadow-md transition-all">
<span class="material-symbols-outlined text-slate-600 dark:text-slate-400">menu</span>
<div class="size-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center overflow-hidden">
<span class="material-symbols-outlined text-slate-400">account_circle</span>
</div>
</button>
</div>
</div>
</header>
<!-- Sub-Header: Category/Filter Bar -->
<div class="sticky top-20 z-40 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
<div class="max-w-[1440px] mx-auto px-4 lg:px-10 py-4 flex items-center justify-between gap-4">
<div class="flex items-center gap-6 overflow-x-auto hide-scrollbar">
<button class="flex flex-col items-center gap-2 border-b-2 border-slate-900 dark:border-white pb-2 min-w-max">
<span class="material-symbols-outlined">beach_access</span>
<span class="text-xs font-semibold">Frente ao Mar</span>
</button>
<button class="flex flex-col items-center gap-2 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 pb-2 text-slate-500 min-w-max transition-all">
<span class="material-symbols-outlined">pool</span>
<span class="text-xs font-semibold">Piscinas</span>
</button>
<button class="flex flex-col items-center gap-2 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 pb-2 text-slate-500 min-w-max transition-all">
<span class="material-symbols-outlined">villa</span>
<span class="text-xs font-semibold">Villas</span>
</button>
<button class="flex flex-col items-center gap-2 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 pb-2 text-slate-500 min-w-max transition-all">
<span class="material-symbols-outlined">surfing</span>
<span class="text-xs font-semibold">Surf Spots</span>
</button>
<button class="flex flex-col items-center gap-2 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 pb-2 text-slate-500 min-w-max transition-all">
<span class="material-symbols-outlined">apartment</span>
<span class="text-xs font-semibold">Apartamentos</span>
</button>
<button class="flex flex-col items-center gap-2 border-b-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 pb-2 text-slate-500 min-w-max transition-all">
<span class="material-symbols-outlined">nature_people</span>
<span class="text-xs font-semibold">Eco-Hospedagens</span>
</button>
</div>
<div class="flex items-center gap-3 shrink-0">
<button class="flex items-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 transition-colors">
<span class="material-symbols-outlined text-lg">tune</span>
                    Filtros
                </button>
<div class="hidden sm:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
<button class="px-4 py-2 bg-white dark:bg-slate-900 shadow-sm rounded-md text-sm font-semibold">Lista</button>
<button class="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Mapa</button>
</div>
</div>
</div>
</div>
<!-- Main Content Area -->
<main class="max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
<div class="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
<div>
<h2 class="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">Cabo Verde: Mais de 300 casas de férias</h2>
<p class="text-slate-500 dark:text-slate-400 mt-1">Explore as melhores estadias nas ilhas do Sal, Boavista e Santiago.</p>
</div>
<div class="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
<span>Preços em</span>
<button class="underline decoration-primary underline-offset-4">CVE (Escudos)</button>
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
<!-- Rental Card 1 -->
<div class="group flex flex-col gap-3">
<div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Beachfront luxury villa with blue pool" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAiX0aSh_NCa4ETInOlVrDVDMUC3p3nmQawNGH3PQu3peVR81c85cCykMi8yluZF3iyv4nF3i4Tr9Pt_73KnaKdt2TfX1tk0eKyjCiQBELJeG3He4dXmE_HrMnEBx_aFSB_intf0alKMPy4RywgHgWdmwxi5eQQU5t3hNIzisEHNU-JbA3WCkS5SIAvrMjBgu91DXNCd2GaRl8jIqr_bhjE4w42Rw_cWPGokHlOmxVYB5bYRVKa4Xg3IUIbstaHmlaxyYVk-xWYRQ"/>
<button class="absolute top-4 right-4 text-white drop-shadow-md hover:scale-110 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">favorite</span>
</button>
<div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-primary text-sm font-fill">verified</span>
<span class="text-[10px] font-bold uppercase tracking-wider text-slate-800">Superhost</span>
</div>
</div>
<div class="flex flex-col gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg text-slate-900 dark:text-slate-100">Villa Azure - Sal</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-sm text-primary font-fill">star</span>
<span class="text-sm font-bold">4.92</span>
<span class="text-sm text-slate-400 font-normal">(124)</span>
</div>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm">Frente ao mar • Santa Maria</p>
<div class="flex gap-4 my-2 text-slate-400">
<span class="material-symbols-outlined text-xl" title="Piscina">pool</span>
<span class="material-symbols-outlined text-xl" title="Wi-Fi">wifi</span>
<span class="material-symbols-outlined text-xl" title="Ar Condicionado">ac_unit</span>
</div>
<div class="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
<div>
<span class="text-lg font-bold">12.500 CVE</span>
<span class="text-slate-500 text-sm font-normal"> / noite</span>
</div>
<button class="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-4 py-2 rounded-lg transition-all text-sm">
                            Reservar Agora
                        </button>
</div>
</div>
</div>
<!-- Rental Card 2 -->
<div class="group flex flex-col gap-3">
<div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern apartment overlooking the ocean" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYAIGeR4yPZ-WCYqeCHOrgC0R15xekBOt72xcMWYGpt5vQ-5MEKcHhpKrENa2VTJUEZdFFHVgT063Wvbfvg7Ydnc97HcgfJUol32ImNR4Uzz69aIL7YmQlGRiEnXanuJJAzULF_FQfR7RXZhq8WlAmQovW0wP1szmAqgTTqRW-C64RgSfC-1HwBc_wm6S8HyIfBjA91QsLYR4JOwDAZjvOnDyHbCvJyJowilPEEYd-oeavF4QEGSNPOcaWBESW05FaDZeB6_4yMS8"/>
<button class="absolute top-4 right-4 text-white drop-shadow-md hover:scale-110 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">favorite</span>
</button>
</div>
<div class="flex flex-col gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg text-slate-900 dark:text-slate-100">Penthouse Vista Praia</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-sm text-primary font-fill">star</span>
<span class="text-sm font-bold">4.85</span>
<span class="text-sm text-slate-400 font-normal">(89)</span>
</div>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm">Praia, Ilha de Santiago</p>
<div class="flex gap-4 my-2 text-slate-400">
<span class="material-symbols-outlined text-xl" title="Wi-Fi">wifi</span>
<span class="material-symbols-outlined text-xl" title="Ar Condicionado">ac_unit</span>
<span class="material-symbols-outlined text-xl" title="Cozinha">restaurant</span>
</div>
<div class="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
<div>
<span class="text-lg font-bold">8.900 CVE</span>
<span class="text-slate-500 text-sm font-normal"> / noite</span>
</div>
<button class="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-4 py-2 rounded-lg transition-all text-sm">
                            Reservar Agora
                        </button>
</div>
</div>
</div>
<!-- Rental Card 3 -->
<div class="group flex flex-col gap-3">
<div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Tropical island resort with palm trees" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNxfnKL6RsfWR96ws0TXWyOy1bM7rQBx3-NA0fRMTyYK9JAod_MCXC4_FJ120vnsHUzkRDbpiUdRWwrJjeOD_JHPQgxs2va69J7PTBpwa6j3wrD_F-zqE093Xny8UreaL0wphj7aK9DWEhwvxNgDXazbaR4a-sfo6bCCO1gYy5cPo2ikBDI9plrACKAAmN4AsC0vzblRjkaJrq8gY5tmsBO6uLHEoFUTuRl-EgC82wHXpmglJmdU2UTQ85ASHihN6U-m7jIULR4sA"/>
<button class="absolute top-4 right-4 text-white drop-shadow-md hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary font-fill">favorite</span>
</button>
<div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-primary text-sm font-fill">verified</span>
<span class="text-[10px] font-bold uppercase tracking-wider text-slate-800">Superhost</span>
</div>
</div>
<div class="flex flex-col gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg text-slate-900 dark:text-slate-100">Boavista Eco-Resort</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-sm text-primary font-fill">star</span>
<span class="text-sm font-bold">4.98</span>
<span class="text-sm text-slate-400 font-normal">(210)</span>
</div>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm">Praia de Chaves, Boavista</p>
<div class="flex gap-4 my-2 text-slate-400">
<span class="material-symbols-outlined text-xl" title="Eco-friendly">eco</span>
<span class="material-symbols-outlined text-xl" title="Piscina">pool</span>
<span class="material-symbols-outlined text-xl" title="Beach Access">beach_access</span>
</div>
<div class="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
<div>
<span class="text-lg font-bold">15.200 CVE</span>
<span class="text-slate-500 text-sm font-normal"> / noite</span>
</div>
<button class="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-4 py-2 rounded-lg transition-all text-sm">
                            Reservar Agora
                        </button>
</div>
</div>
</div>
<!-- Rental Card 4 -->
<div class="group flex flex-col gap-3">
<div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Boutique hotel with private terrace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8KYmnwYNpHUkdFSx4ho45qQBkGKksfqHpamgiqlJSEonrmaHFRxJeRVgD8QjZR9Xh2vjOQj9Nk3YCyn_CsvLHivgF_dH0OALlBtKoP6oB_wY6vWbXaexbbTUP9dxfGzWwbK4ZMie6UV7SQOlH2MvEwLN8FnqKHqIlP7jtPVVQPAvEziWbrg5-4uH2-jcGBvPxvViLCr188M3J9T93SggJaAtkPgvOUOxTy1eHBuOFVJVBK3wTW__9EXIzgzKAe4bWqQVa00O95s"/>
<button class="absolute top-4 right-4 text-white drop-shadow-md hover:scale-110 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">favorite</span>
</button>
</div>
<div class="flex flex-col gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg text-slate-900 dark:text-slate-100">Boutique Suite Mindelo</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-sm text-primary font-fill">star</span>
<span class="text-sm font-bold">4.79</span>
<span class="text-sm text-slate-400 font-normal">(56)</span>
</div>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm">Mindelo, São Vicente</p>
<div class="flex gap-4 my-2 text-slate-400">
<span class="material-symbols-outlined text-xl" title="Wi-Fi">wifi</span>
<span class="material-symbols-outlined text-xl" title="Perto do centro">location_city</span>
<span class="material-symbols-outlined text-xl" title="Ar Condicionado">ac_unit</span>
</div>
<div class="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
<div>
<span class="text-lg font-bold">6.500 CVE</span>
<span class="text-slate-500 text-sm font-normal"> / noite</span>
</div>
<button class="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-4 py-2 rounded-lg transition-all text-sm">
                            Reservar Agora
                        </button>
</div>
</div>
</div>
<!-- Rental Card 5 -->
<div class="group flex flex-col gap-3">
<div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Traditional stone house with modern interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg_9Yer2VrCKhndFVCLPTp5cxYS946-i6_3MDuj2bvBI1lKlZVnZhsYDUcvZWI5Ae89_c2evrtR681BMhrgiv9C3ZrK71UIKRlOwFX86WZEKX1DuMu9kbHB0JD8Q2txh-q2Werof1RG-dcVAfavUITONrbs9c2XjdvHkaHtMrG8cQgot8y-2UjXx8O34aokcr0bQDduaLfqNNhKH7Hd72GUXBT7apR9--IFWw59oXK6v45SG1c4ayn22XQn909pQR3iUhNW-Vpn8Q"/>
<button class="absolute top-4 right-4 text-white drop-shadow-md hover:scale-110 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">favorite</span>
</button>
</div>
<div class="flex flex-col gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg text-slate-900 dark:text-slate-100">Casa de Pedra Tradicional</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-sm text-primary font-fill">star</span>
<span class="text-sm font-bold">4.90</span>
<span class="text-sm text-slate-400 font-normal">(42)</span>
</div>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm">Ribeira Grande, Santo Antão</p>
<div class="flex gap-4 my-2 text-slate-400">
<span class="material-symbols-outlined text-xl" title="Natureza">terrain</span>
<span class="material-symbols-outlined text-xl" title="Pet Friendly">pets</span>
<span class="material-symbols-outlined text-xl" title="Kitchen">cooking</span>
</div>
<div class="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
<div>
<span class="text-lg font-bold">5.800 CVE</span>
<span class="text-slate-500 text-sm font-normal"> / noite</span>
</div>
<button class="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-4 py-2 rounded-lg transition-all text-sm">
                            Reservar Agora
                        </button>
</div>
</div>
</div>
<!-- Rental Card 6 -->
<div class="group flex flex-col gap-3">
<div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Chic studio apartment in city center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB94Bk446hMye2WkV_gJhDA1esUj-t_PSb5q55JGQZzgCFdpvWi-tDHL_EmQS4OQ_0uRjgntOHER80P_iQLVo6K3fRWmlR-TTvfNfMG6hY7zPHtyQr1QLIE8mvKstpkzNV9R4sTEEIu8dOqbla3g4XBl8uI8RDXff_xgJuGVGDu6HhBzRlW0U7Lleou7edVcGFAFw14hy6kJCF5vLwrrlvamN85m_mbAL5aZde2QsNnkQPjU8Gl4jiFiPh8v2B7c9tO74zFOrVIP8"/>
<button class="absolute top-4 right-4 text-white drop-shadow-md hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary font-fill">favorite</span>
</button>
</div>
<div class="flex flex-col gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg text-slate-900 dark:text-slate-100">Studio Moderno Plateau</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-sm text-primary font-fill">star</span>
<span class="text-sm font-bold">4.65</span>
<span class="text-sm text-slate-400 font-normal">(31)</span>
</div>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm">Plateau, Cidade da Praia</p>
<div class="flex gap-4 my-2 text-slate-400">
<span class="material-symbols-outlined text-xl" title="Wi-Fi">wifi</span>
<span class="material-symbols-outlined text-xl" title="Workplace">laptop_mac</span>
<span class="material-symbols-outlined text-xl" title="Ar Condicionado">ac_unit</span>
</div>
<div class="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
<div>
<span class="text-lg font-bold">4.200 CVE</span>
<span class="text-slate-500 text-sm font-normal"> / noite</span>
</div>
<button class="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-4 py-2 rounded-lg transition-all text-sm">
                            Reservar Agora
                        </button>
</div>
</div>
</div>
<!-- Rental Card 7 -->
<div class="group flex flex-col gap-3">
<div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Spacious family home with garden" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB19155J4BdfehwS0CplYdYFbpL-t8A1Pob2wYCHP0xkie07SJmdsYOO0r9ypmYHbaiAhthh9YGEepdpjykQYulw1AiUYMUbfw_-25M_EE-BZvrRihVuXo7m3fHk7D5G46klbdVQHoNOXa8HQ8U3iwmqwrNxezeOiBW9Tp8wIEIYHsNRbWx8-dFxvraXQlRhfZXngbgwj6yJt8A8tj0CoaTVgTMpTSc9mwt48v4rHFe3f9IXng3r2kTsa1lcyAXT6ig_wuex0BuyGw"/>
<button class="absolute top-4 right-4 text-white drop-shadow-md hover:scale-110 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">favorite</span>
</button>
<div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-primary text-sm font-fill">verified</span>
<span class="text-[10px] font-bold uppercase tracking-wider text-slate-800">Superhost</span>
</div>
</div>
<div class="flex flex-col gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg text-slate-900 dark:text-slate-100">Casa Família Salina</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-sm text-primary font-fill">star</span>
<span class="text-sm font-bold">4.95</span>
<span class="text-sm text-slate-400 font-normal">(18)</span>
</div>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm">Pedra de Lume, Ilha do Sal</p>
<div class="flex gap-4 my-2 text-slate-400">
<span class="material-symbols-outlined text-xl" title="Piscina">pool</span>
<span class="material-symbols-outlined text-xl" title="Parking">directions_car</span>
<span class="material-symbols-outlined text-xl" title="Garden">yard</span>
</div>
<div class="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
<div>
<span class="text-lg font-bold">11.000 CVE</span>
<span class="text-slate-500 text-sm font-normal"> / noite</span>
</div>
<button class="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-4 py-2 rounded-lg transition-all text-sm">
                            Reservar Agora
                        </button>
</div>
</div>
</div>
<!-- Rental Card 8 -->
<div class="group flex flex-col gap-3">
<div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Rustic beach hut by the waves" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCECXR9FDodiQElDGZ0lCQpcKGUK2iqOFrTQ72QgQam1CqDg4Ml-RWxOsekX1nIBCn8ugBqCqmX4li4FqsbFmhIrAfXYbfPnK8tdj5aLr5LEBZDcU31LE35UeDVm-QZKbWD1671m8bmbYXwLRcV63XsKT5t8hPDCJZfN2Lyr_EpKBIC1zMmGwok6WiFgtACRBqQpn53eWpNMt1_yF9SrGpfc3GlGf24OX-AI20aSuHlLU4Ew3wKWzVBuCW1MqaATbRy2vyfw-YDtog"/>
<button class="absolute top-4 right-4 text-white drop-shadow-md hover:scale-110 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">favorite</span>
</button>
</div>
<div class="flex flex-col gap-1">
<div class="flex justify-between items-start">
<h3 class="font-bold text-lg text-slate-900 dark:text-slate-100">Beach Shack Fogo</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-sm text-primary font-fill">star</span>
<span class="text-sm font-bold">4.82</span>
<span class="text-sm text-slate-400 font-normal">(67)</span>
</div>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm">São Filipe, Ilha do Fogo</p>
<div class="flex gap-4 my-2 text-slate-400">
<span class="material-symbols-outlined text-xl" title="Beach Front">waves</span>
<span class="material-symbols-outlined text-xl" title="Volcano View">volcano</span>
<span class="material-symbols-outlined text-xl" title="Breakfast">coffee</span>
</div>
<div class="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
<div>
<span class="text-lg font-bold">7.200 CVE</span>
<span class="text-slate-500 text-sm font-normal"> / noite</span>
</div>
<button class="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-4 py-2 rounded-lg transition-all text-sm">
                            Reservar Agora
                        </button>
</div>
</div>
</div>
</div>
<!-- Pagination / Load More -->
<div class="flex flex-col items-center gap-6 mt-16 pb-12">
<p class="text-sm font-semibold text-slate-600 dark:text-slate-400">A mostrar 8 de 342 casas de férias</p>
<button class="px-8 py-4 border-2 border-slate-900 dark:border-white rounded-xl font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">
                Carregar Mais Resultados
            </button>
</div>
</main>
<!-- Map Toggle Button (Mobile Floating) -->
<button class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl z-50 lg:hidden">
<span class="material-symbols-outlined">map</span>
<span class="font-bold">Mostrar Mapa</span>
</button>
<!-- Footer -->
<footer class="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
<div class="max-w-[1440px] mx-auto px-4 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
<div class="col-span-1 md:col-span-1">
<div class="flex items-center gap-2 mb-6">
<div class="size-8 bg-primary rounded flex items-center justify-center text-white">
<span class="material-symbols-outlined text-xl">holiday_village</span>
</div>
<span class="text-xl font-bold">imo.cv</span>
</div>
<p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    O maior marketplace imobiliário de Cabo Verde. Facilitamos a ligação entre proprietários locais, turistas e a nossa diáspora.
                </p>
</div>
<div>
<h4 class="font-bold mb-6">Explorar Ilhas</h4>
<ul class="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
<li><a class="hover:text-primary transition-colors" href="#">Ilha do Sal</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Boavista</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Santiago (Praia)</a></li>
<li><a class="hover:text-primary transition-colors" href="#">São Vicente (Mindelo)</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Santo Antão</a></li>
</ul>
</div>
<div>
<h4 class="font-bold mb-6">Suporte</h4>
<ul class="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
<li><a class="hover:text-primary transition-colors" href="#">Central de Ajuda</a></li>
<li><a class="hover:text-primary transition-colors" href="#">AirCover</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Segurança do Viajante</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Opções de Cancelamento</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Reportar Problema</a></li>
</ul>
</div>
<div>
<h4 class="font-bold mb-6">Newsletter</h4>
<p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Receba as melhores ofertas de férias no seu email.</p>
<div class="flex gap-2">
<input class="flex-1 rounded-lg border-slate-200 dark:border-slate-700 bg-transparent text-sm" placeholder="Email" type="email"/>
<button class="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-2 rounded-lg">
<span class="material-symbols-outlined">send</span>
</button>
</div>
</div>
</div>
<div class="max-w-[1440px] mx-auto px-4 lg:px-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
<div class="flex items-center gap-6">
<span>© 2024 imo.cv Marketplace. Todos os direitos reservados.</span>
<a class="hover:underline" href="#">Privacidade</a>
<a class="hover:underline" href="#">Termos</a>
<a class="hover:underline" href="#">Mapa do Site</a>
</div>
<div class="flex items-center gap-4">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">language</span> Português (PT)</span>
<span class="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">CVE</span>
</div>
</div>
</footer>
</body></html>

<!-- Vacation Rentals Search View -->
<!DOCTYPE html>

<html lang="pt"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>imo.cv - Dashboard do Utilizador</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#3b1e8a",
                        "success": "#10B981",
                        "background-light": "#f6f6f8",
                        "background-dark": "#161220",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .filled-icon { font-variation-settings: 'FILL' 1; }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
<div class="flex min-h-screen">
<!-- Sidebar Navigation -->
<aside class="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col hidden lg:flex">
<div class="p-6">
<div class="flex items-center gap-3">
<div class="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
<span class="material-symbols-outlined">home_work</span>
</div>
<div>
<h1 class="text-xl font-bold tracking-tight text-primary">imo.cv</h1>
<p class="text-xs text-slate-500 font-medium uppercase tracking-wider">Portal Imobiliário</p>
</div>
</div>
</div>
<nav class="flex-1 px-4 space-y-1">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold" href="#">
<span class="material-symbols-outlined filled-icon">dashboard</span>
<span>Dashboard Home</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">favorite</span>
<span>Favoritos</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">notifications_active</span>
<span>Alertas de Pesquisa</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">mail</span>
<span>Mensagens</span>
<span class="ml-auto bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
<span class="material-symbols-outlined">person</span>
<span>Meu Perfil</span>
</a>
</nav>
<div class="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
<div class="flex items-center gap-3 p-2">
<div class="size-10 rounded-full bg-slate-200 overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Avatar de perfil do utilizador masculino sorrindo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-wHdgMYi4HRsgb7i5F7yU_DYor2Skt24_drQNXDIjClvJMimoFYjaNWCN_B11mwmONmhAmKEZbYQ3JbkKEa8oQts4qXXmBLJupiRW0cziqLNDahfSIXF__aukSS-QsKQlh6uNGqujaoAaxR6w5o8tpYTW16j4wULSiCf487kSlEu24GiJ2kATXh9t-It6Of5M6oXfnuZP61wdEk7L9ub4BaRB65RntWul1rFc0Mp2pwh77IIWFI_WSZmFETH_WjRH62_tQWxARaE"/>
</div>
<div class="flex-1 min-w-0">
<p class="text-sm font-semibold truncate">Utilizador</p>
<p class="text-xs text-slate-500 truncate">Sair da conta</p>
</div>
<span class="material-symbols-outlined text-slate-400">logout</span>
</div>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-16">
<!-- Welcome Header & Progress -->
<header class="mb-10">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Bem-vindo de volta, Utilizador!</h2>
<p class="text-slate-600 dark:text-slate-400 mt-2">Veja as novidades das suas pesquisas guardadas e favoritos.</p>
</div>
<div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-[300px]">
<div class="flex justify-between items-center mb-2">
<span class="text-sm font-medium">Perfil 85% Completo</span>
<span class="text-sm font-bold text-primary">85%</span>
</div>
<div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-3">
<div class="bg-primary h-2 rounded-full" style="width: 85%"></div>
</div>
<p class="text-[11px] text-slate-500 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">info</span>
                            Adicione a sua foto para chegar aos 100%
                        </p>
</div>
</div>
</header>
<!-- Grid Layout for Favorites and Sidebar info -->
<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
<!-- Left Column: Favorites & Recent Inquiries -->
<div class="xl:col-span-2 space-y-10">
<!-- Favorites Grid -->
<section>
<div class="flex items-center justify-between mb-6">
<h3 class="text-xl font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-red-500 filled-icon">favorite</span>
                                Os Meus Favoritos
                            </h3>
<a class="text-primary text-sm font-semibold hover:underline" href="#">Ver todos</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Card 1 -->
<div class="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group transition-all hover:shadow-md">
<div class="relative h-48">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Moradia de luxo moderna com piscina em Palmarejo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOcka2t5HYqOq-uUTWySlhWIUnD3WRYTPRUfFrwpLXjwsBdgB22YbbeRUgjrLoY055gJKzEQwxajgEzg_HawL2dzBXvXRL0hffCXIO1IU1dQIAYmZgfzYtRBuqM8Tof77AtI9BPT8TPjyfLH_W1BsPFPp0D8gOvrljJfQ4rX8sLmM60gOuU9lwjfb0uVoDATPsXTt4E36iPLi1Ty8JLt1nKylusPNzqjJA9OycTc_6a4fCSBQ2p1kyXtfZcQJ4M-G1aG8-L7eKmt0"/>
<button class="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 text-red-500 flex shadow-sm">
<span class="material-symbols-outlined filled-icon">favorite</span>
</button>
</div>
<div class="p-4">
<h4 class="text-xl font-bold text-slate-900 dark:text-white">10.000.000 CVE</h4>
<p class="text-slate-500 text-sm mb-4">Apartamento T2 em Palmarejo, Praia</p>
<button class="w-full py-2.5 bg-primary text-white rounded-lg font-medium text-sm transition-opacity hover:opacity-90">Ver Detalhes</button>
</div>
</div>
<!-- Card 2 -->
<div class="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group transition-all hover:shadow-md">
<div class="relative h-48">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Interior de apartamento minimalista em Achada Santo António" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIXgsvr7um7G6st-lqGIxyUulB9DEch2f3a_hv0NHtYyobxRznm7W2LfNUGHbUex1gGEmHbIyeG0sPwfSvUmyk9LoI6Cm7q4F7MxWnJ988ve0k9jJyD2xSVEnrF20TT_5Ro06loXlHcTtqkQfW-URVc7whSkbhGv4r4WjnyUW53o8275_HB6cyRtwhQMsFNBdr8jdYGlLqt9QnDCxTywpLzwBeFZ9dX6Pnwad5LMv1QQYBDp_EV8lezNI7Tc_mf_ygD_oNFYcAw4k"/>
<button class="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 text-red-500 flex shadow-sm">
<span class="material-symbols-outlined filled-icon">favorite</span>
</button>
</div>
<div class="p-4">
<h4 class="text-xl font-bold text-slate-900 dark:text-white">8.500.000 CVE</h4>
<p class="text-slate-500 text-sm mb-4">Apartamento T1 em Achada Sto António</p>
<button class="w-full py-2.5 bg-primary text-white rounded-lg font-medium text-sm transition-opacity hover:opacity-90">Ver Detalhes</button>
</div>
</div>
</div>
</section>
<!-- Recent Inquiries -->
<section>
<h3 class="text-xl font-bold mb-6">Contactos Recentes</h3>
<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
<div class="divide-y divide-slate-100 dark:divide-slate-800">
<div class="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50">
<div class="flex items-center gap-4">
<div class="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
<span class="material-symbols-outlined">person_pin_circle</span>
</div>
<div>
<p class="font-semibold text-sm">Imobiliária Praia Norte</p>
<p class="text-xs text-slate-500">Ref: T2 Palmarejo</p>
</div>
</div>
<span class="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase rounded-full">Aguardando Resposta</span>
</div>
<div class="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50">
<div class="flex items-center gap-4">
<div class="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
<span class="material-symbols-outlined">person_pin_circle</span>
</div>
<div>
<p class="font-semibold text-sm">Mindelo Real Estate</p>
<p class="text-xs text-slate-500">Ref: T3 Mindelo Bay</p>
</div>
</div>
<span class="px-3 py-1 bg-success/10 text-success text-[10px] font-bold uppercase rounded-full">Respondido</span>
</div>
</div>
</div>
</section>
</div>
<!-- Right Column: Saved Searches & Stats -->
<div class="space-y-8">
<!-- Saved Searches -->
<section>
<div class="flex items-center justify-between mb-4">
<h3 class="text-lg font-bold">Alertas Ativos</h3>
<button class="text-primary text-xs font-bold uppercase tracking-wider">Novo Alerta</button>
</div>
<div class="space-y-4">
<!-- Alert Item 1 -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div class="flex justify-between items-start mb-3">
<p class="font-bold text-slate-900 dark:text-white leading-snug">T2 em Palmarejo <br/><span class="text-primary">Abaixo de 10M CVE</span></p>
<button class="text-slate-400 hover:text-red-500 transition-colors">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="text-xs text-slate-500 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">mail</span> E-mail
                                        </span>
<button class="w-8 h-4 bg-success rounded-full relative transition-colors">
<div class="absolute right-0.5 top-0.5 size-3 bg-white rounded-full"></div>
</button>
</div>
<div class="flex items-center justify-between">
<span class="text-xs text-slate-500 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">chat_bubble</span> WhatsApp
                                        </span>
<button class="w-8 h-4 bg-slate-300 dark:bg-slate-700 rounded-full relative transition-colors">
<div class="absolute left-0.5 top-0.5 size-3 bg-white rounded-full"></div>
</button>
</div>
</div>
</div>
<!-- Alert Item 2 -->
<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
<div class="flex justify-between items-start mb-3">
<p class="font-bold text-slate-900 dark:text-white leading-snug">T1 em Achada Sto Ant. <br/><span class="text-primary">Em Destaque</span></p>
<button class="text-slate-400 hover:text-red-500 transition-colors">
<span class="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>
<div class="space-y-3">
<div class="flex items-center justify-between">
<span class="text-xs text-slate-500 flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">mail</span> E-mail
                                        </span>
<button class="w-8 h-4 bg-success rounded-full relative transition-colors">
<div class="absolute right-0.5 top-0.5 size-3 bg-white rounded-full"></div>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- Promotion/Tips Card -->
<section class="bg-gradient-to-br from-primary to-[#5a39c0] p-6 rounded-2xl text-white">
<span class="material-symbols-outlined text-4xl mb-4">lightbulb</span>
<h4 class="text-lg font-bold mb-2">Dica Pro</h4>
<p class="text-white/80 text-sm leading-relaxed mb-4">Ative as notificações via WhatsApp para receber novos imóveis em tempo real. Os melhores negócios fecham em menos de 48h.</p>
<button class="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg text-sm font-bold transition-colors">Configurar Notificações</button>
</section>
</div>
</div>
</main>
</div>
</body></html>