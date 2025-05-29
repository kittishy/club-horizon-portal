import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Por enquanto, vamos adicionar apenas traduções simples em PT e EN para o Navbar
const resources = {
  en: {
    translation: {
      "Clube Harmonia": "Harmony Club",
      "Home": "Home",
      "Eventos": "Events",
      "Calendário": "Calendar",
      "Notícias": "News",
      "Contatos": "Contact",
      // Adicione mais chaves conforme necessário

      // Home Page
      "home.welcome": "Welcome to Harmony Club!",
      "home.heroSubtitle": "Your haven for leisure, culture, and connections. Discover a universe of memorable experiences.",
      "home.upcomingEventsLink": "Upcoming Events",
      "home.joinUsLink": "Join Us",
      "home.activeMembers": "Active Members",
      "home.eventsPerYear": "Events per Year",
      "home.modernEnvironments": "Modern Environments",
      "home.yearsOfTradition": "Years of Tradition",
      "home.upcomingEventsTitle": "Upcoming Events",
      "home.viewAllLink": "View All",
      "home.moreDetailsButton": "More Details",
      "home.recentNewsTitle": "Latest News",
      "home.readMoreButton": "Read More",
      "home.event.galaDinner.title": "Annual Gala Dinner",
      "home.event.galaDinner.description": "Our traditional gala dinner with live music and awards.",
      "home.event.chessTournament.title": "Chess Tournament",
      "home.event.chessTournament.description": "Monthly chess championship open to all members.",
      "home.event.cookingWorkshop.title": "Italian Cooking Workshop",
      "home.event.cookingWorkshop.description": "Learn to make fresh pasta and classic sauces with our guest chef.",
      "home.news.fitnessPartnership.title": "New Partnership with Premium Fitness Academy",
      "home.news.fitnessPartnership.excerpt": "Great news for members! We have partnered with Premium Fitness Academy, offering exclusive discounts on monthly and annual plans.",
      "home.news.poolRenovation.title": "Complete Renovation of the Main Pool",
      "home.news.poolRenovation.excerpt": "The modernization works on our main pool have been completed. Come check out the new heating system and renovated leisure area!",
      "home.publishedOn": "Published on: {{date}}", // Exemplo com interpolação

      // Events Page
      "eventsPage.title": "Our Events",
      "eventsPage.subtitle": "Stay updated with the vibrant event schedule at Harmony Club. From cultural workshops to sports competitions, there's always something happening!",
      "eventsPage.noEventsTitle": "No Events Scheduled",
      "eventsPage.noEventsSubtitle": "Check back soon for our future schedule!",
      "event.participantsText": "{{count}} participants {{statusAffix}}",
      "event.participants.expected": "expected",
      "event.participants.confirmed": "confirmed",
      // Categorias de Eventos
      "event.category.Social": "Social",
      "event.category.Esportivo": "Sports",
      "event.category.Cultural": "Cultural",
      "event.category.Educacional": "Educational",
      // Status de Eventos
      "event.status.Inscrições Abertas": "Registrations Open",
      "event.status.Quase Lotado": "Almost Full",
      "event.status.Lotado": "Sold Out",
      "event.status.Em Breve": "Coming Soon",
      "event.status.Cancelado": "Cancelled",
      "event.status.Realizado": "Held",
      // Detalhes dos Eventos (exemplos, expandir conforme useEventsData)
      "event.galaDinner.title": "Harmony Club Annual Gala Dinner",
      "event.galaDinner.description": "Our traditional gala dinner with live music, awards, and excellent networking opportunities. Dress code: full formal attire.",
      "event.chessTournament.title": "Grand Club Chess Tournament",
      "event.chessTournament.description": "Showcase your strategy in the monthly chess championship. Special prizes for the top three finishers. Limited spots!",
      "event.cookingWorkshop.title": "Exclusive Italian Cuisine Workshop",
      "event.cookingWorkshop.description": "Learn the secrets of authentic Italian cuisine with renowned Chef Giovanni. Includes tasting and certificate.",
      "event.investmentsTalk.title": "Lecture: The Future of Smart Investments",
      "event.investmentsTalk.description": "Global financial market specialist presents trends, innovations, and opportunities for the second half of the year. Limited spots.",
      "event.jazzNight.title": "Acoustic Jazz & Blues Night",
      "event.jazzNight.description": "A magical evening with the best of acoustic jazz and blues. Intimate setting with panoramic city views. Reserve your table.",
      "event.tennisOpen.title": "Harmony Tennis Open - Winter Edition",
      "event.tennisOpen.description": "Participate in our traditional doubles tennis tournament. Special breakfast and gifts for all registered athletes.",
      "event.filmFestival.title": "Classic French Film Festival",
      "event.filmFestival.description": "A week dedicated to the great classics of French cinema, with discussions after screenings. Popcorn and soda on us!",
      "event.masqueradeBall.title": "Masquerade Ball: A Night in Venice",
      "event.masqueradeBall.description": "Prepare your mask and come experience a night of mystery and glamour at our themed ball. Music, dance, and surprises! Please note that wearing a mask is mandatory for entry.",
      
      // Event Locations
      "location.mainHall": "Main Hall",
      "location.gamesRoom": "Games Room",
      "location.gourmetKitchen": "Gourmet Kitchen",
      "location.nobleHall": "Noble Hall",
      "location.mainAuditorium": "Main Auditorium",
      "location.panoramicLounge": "Panoramic Lounge",
      "location.tennisCourts": "Tennis Courts",
      "location.cinemaRoom": "Cinema Room",
      "location.imperialHall": "Imperial Hall",

      // News Page & News Card
      "newsPage.title": "Club News",
      "newsPage.subtitle": "Stay informed about everything happening at Harmony Club. Updates, announcements, and special stories.",
      "newsPage.noNewsTitle": "No News Available",
      "newsPage.noNewsSubtitle": "There are no news articles at the moment. Please check back later.",
      "newsCard.readFullArticle": "Read Full Article",
      "newsCard.categoryLabel": "Category: ",
      
      // Categorias de Notícias (exemplos)
      "news.category.ClubUpdates": "Club Updates",
      "news.category.MemberSpotlight": "Member Spotlight",
      "news.category.SpecialEvents": "Special Events",
      "news.category.Maintenance": "Maintenance & Improvements",

      // Notícias mock (títulos e resumos) - expandir conforme useNewsData
      "news.article1.title": "New Pool Complex Inaugurated",
      "news.article1.summary": "After months of renovation, our new aquatic complex is ready! Modern pools, new changing rooms, and a snack bar.",
      "news.article2.title": "Annual Members' Assembly Scheduled",
      "news.article2.summary": "The annual assembly will take place on July 15th. Check the agenda and participate in the club's decisions.",
      "news.article3.title": "Harmony Club Shines in Regional Tennis Tournament",
      "news.article3.summary": "Our athletes brought home three trophies from the last regional tennis tournament. Congratulations to the team!",
      "news.article4.title": "Gastronomy Festival Coming in August",
      "news.article4.summary": "Get ready for a journey of flavors! The Harmony Gastronomy Festival will feature themed dinners and renowned chefs.",
      "news.article5.title": "Important: System Maintenance on July 5th",
      "news.article5.summary": "Our online systems, including reservations and payments, will be unavailable from 2 AM to 6 AM on July 5th for scheduled maintenance.",

      // Calendar Page
      "calendarPage.title": "Club Event Calendar",
      "calendarPage.subtitle": "Explore our full schedule of activities and never miss an important event.",
      "calendar.today": "Today",
      "calendar.previous": "Previous",
      "calendar.next": "Next",
      "calendar.month": "Month",
      "calendar.week": "Week",
      "calendar.day": "Day",
      "calendar.agenda": "Agenda",
      "calendar.noEventsInRange": "No events scheduled for this period.",
      "calendar.allDay": "All Day",
      "calendar.showMore": "+{{count}} more",

      // Contact Page
      "contactPage.title": "Contact Us",
      "contactPage.subtitle": "We are here to help. Send us a message or visit us.",
      "contactPage.formTitle": "Send a Message",
      "contactPage.form.nameLabel": "Full Name",
      "contactPage.form.namePlaceholder": "Enter your full name",
      "contactPage.form.emailLabel": "Email Address",
      "contactPage.form.emailPlaceholder": "your.email@example.com",
      "contactPage.form.subjectLabel": "Subject",
      "contactPage.form.subjectPlaceholder": "How can we help you?",
      "contactPage.form.messageLabel": "Message",
      "contactPage.form.messagePlaceholder": "Write your message here...",
      "contactPage.form.submitButton": "Send Message",
      "contactPage.form.submitting": "Submitting...",
      "contactPage.form.successMessage": "Message sent successfully! We will contact you soon.",
      "contactPage.form.errorMessage": "Failed to send message. Please try again later.",
      "contactPage.infoTitle": "Our Information",
      "contactPage.address": "Joy Street, 123, Happy City - ES, Brazil",
      "contactPage.phone": "(27) 3333-4444",
      "contactPage.email": "contact@harmonyclub.com.br",
      "contactPage.openingHours": "Opening Hours",
      "contactPage.hoursMonFri": "Monday to Friday: 8 AM - 10 PM",
      "contactPage.hoursSatSun": "Saturday and Sunday: 9 AM - 8 PM",
      "contactPage.mapTitle": "Our Location on the Map",
      // Validações do formulário (reutilizando existentes da Fase 4, se possível, ou criando novas)
      "validation.name.required": "Full name is required.",
      "validation.email.required": "Email is required.",
      "validation.email.invalid": "Please enter a valid email address.",
      "validation.subject.required": "Subject is required.",
      "validation.message.required": "Message is required.",
      "validation.message.minLength": "Message must be at least {{count}} characters long.",
      "validation.password.required": "Password is required.",
      "validation.password.minLength:6": "Password must be at least 6 characters long.",
      "validation.confirmPassword.required": "Confirm password is required.",

      // Error messages for data fetching
      "error.genericTitle": "An Error Occurred",
      "error.fetchDataError": "Could not load the requested data. Please try again later.",
      "error.noDataTitle": "No Data",
      "error.noDataAvailable": "There is currently no data to display.",

      // News Detail Page
      "newsDetailPage.notFoundTitle": "News Article Not Found",
      "newsDetailPage.notFoundText": "The news article you are looking for could not be found or does not exist.",
      "newsDetailPage.contentUnavailable": "Full content for this article is currently unavailable.",
      "newsDetailPage.loremIpsum": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

      // Event Detail Page
      "eventDetailPage.title": "Event Details",
      "eventDetailPage.notFoundTitle": "Event Not Found",
      "eventDetailPage.notFoundText": "The event you are looking for could not be found or does not exist.",
      "eventDetailPage.descriptionTitle": "Event Description",
      "eventDetailPage.informationTitle": "Event Information",
      "eventDetailPage.dateLabel": "Date:",
      "eventDetailPage.timeLabel": "Time:",
      "eventDetailPage.locationLabel": "Location:",
      "eventDetailPage.categoryLabel": "Category:",
      "eventDetailPage.statusLabel": "Status:",
      "eventDetailPage.participantsLabel": "Participants:",
      "eventDetailPage.organizerLabel": "Organizer:",
      "eventDetailPage.contactLabel": "Contact:",
      "eventDetailPage.registerButton": "Register for Event",
      "eventDetailPage.viewOnCalendarButton": "View on Calendar",
      "eventDetailPage.fullDescriptionUnavailable": "Full description for this event is currently unavailable.",

      // Navigation
      "navigation.goBackButton": "Go Back",

      // Breadcrumbs
      "breadcrumb.newsDetail": "News: {{newsId}}", // Provisório, idealmente seria o título
      "breadcrumb.eventDetail": "Event: {{eventId}}", // Provisório, idealmente seria o título
      "breadcrumb.detail": "Details",

      // Pagination
      "pagination.previous": "Previous",
      "pagination.next": "Next",
      "pagination.page": "Page {{currentPage}} of {{totalPages}}",
      "pagination.goToPage": "Go to page {{pageNumber}}",

      // General UI
      "Loading...": "Loading...",

      // Filters & Sorting
      "filterSort.title": "Filters and Sorting",
      "filterSort.filterBy": "Filter by",
      "filterSort.sortBy": "Sort by",
      "filterSort.allCategories": "All Categories",
      "filterSort.allStatuses": "All Statuses",
      "filterSort.clearFilters": "Clear Filters",
      "filterSort.apply": "Apply",
      // Sorting Options
      "sort.dateDesc": "Date (Newest First)",
      "sort.dateAsc": "Date (Oldest First)",
      "sort.titleAsc": "Title (A-Z)",
      "sort.titleDesc": "Title (Z-A)",
      "sort.participantsDesc": "Participants (Most)",
      "sort.participantsAsc": "Participants (Fewest)",

      // Authentication & User
      "auth.loginTitle": "Login",
      "auth.loginButton": "Login",
      "auth.logoutButton": "Logout",
      "auth.registerTitle": "Register",
      "auth.registerButton": "Register",
      "auth.emailLabel": "Email",
      "auth.emailPlaceholder": "your.email@example.com",
      "auth.passwordLabel": "Password",
      "auth.passwordPlaceholder": "Enter your password",
      "auth.confirmPasswordLabel": "Confirm Password",
      "auth.confirmPasswordPlaceholder": "Confirm your password",
      "auth.alreadyHaveAccount": "Already have an account? Login",
      "auth.dontHaveAccount": "Don't have an account? Register",
      "auth.loginSuccess": "Login successful!",
      "auth.loginError": "Login failed. Please check your credentials.",
      "auth.registrationSuccess": "Registration successful! You can now log in.",
      "auth.registrationError": "Registration failed. Please try again.",
      "auth.passwordMismatch": "Passwords do not match.",
      "auth.welcomeUser": "Welcome, {{name}}!",
      "auth.myProfile": "My Profile",
      "auth.notLoggedIn": "You are not logged in.",
      "auth.logoutSuccess": "Logout successful! See you next time.",
      "auth.logoutError": "Logout failed. Please try again or contact support.",
      "auth.notAuthorizedErrorTitle": "Access Denied",
      "auth.notAuthorizedErrorDescription": "You do not have permission to access this page.",

      "adminNav.dashboard": "Admin Panel",

      "auth.userMenuMobile": "{{name}} Menu",

      // User Profile Page
      "userProfile.title": "User Profile",
      "userProfile.personalInfo": "Personal Information",
      "userProfile.memberSince": "Member since: {{date}}",
      "userProfile.accountType": "Account Type: {{type}}",
      "userProfile.edit.title": "Edit Profile",
      "userProfile.edit.button": "Edit Profile",
      "userProfile.edit.saveButton": "Save Changes",
      "userProfile.edit.cancelButton": "Cancel",
      "userProfile.edit.success": "Profile updated successfully!",
      "userProfile.edit.error": "Failed to update profile. Please try again.",
      "userRole.member": "Associated Member",
      "userProfile.memberIdLabel": "Member ID:",
      "userProfile.registrationDateLabel": "Registration Date:",
      "userRole.admin": "Administrator",
      "userProfile.changePasswordButton": "Change Password",

      // API Error Messages
      "apiError.login.fetchUsersFailed": "System error during login. Please try again later.", // Failed to fetch users for login simulation
      "apiError.login.invalidCredentials": "Invalid email or password. Please check and try again.", // Invalid email or password
      "apiError.register.checkEmailFailed": "System error during registration. Please try again later.", // Failed to check email availability
      "apiError.register.emailInUse": "This email address is already in use. Please use a different email.", // Email already in use
      "apiError.register.genericFailed": "Registration could not be completed. Please try again.", // Failed to register user
      "apiError.profile.fetchUserFailed": "Could not load user data for update. Please try again.", // Failed to fetch user for update
      "apiError.profile.notAuthenticated": "You must be logged in to update your profile.", // User not authenticated
      "apiError.profile.updateFailed": "Failed to save profile changes to the server. Please try again.", // Failed to update user profile on the server

      // Change Password Page
      "changePassword.title": "Change Password",
      "changePassword.currentPasswordLabel": "Current Password",
      "changePassword.currentPasswordPlaceholder": "Enter your current password",
      "changePassword.newPasswordLabel": "New Password",
      "changePassword.newPasswordPlaceholder": "Enter your new password",
      "changePassword.confirmNewPasswordLabel": "Confirm New Password",
      "changePassword.confirmNewPasswordPlaceholder": "Confirm your new password",
      "changePassword.saveButton": "Change Password",
      "changePassword.success": "Password changed successfully!",
      "changePassword.error": "Failed to change password. Please try again.",
      "validation.currentPassword.required": "Current password is required.",
      "validation.newPassword.required": "New password is required.",
      "validation.newPassword.minLength:8": "New password must be at least 8 characters long.", // Exemplo de validação mais forte
      "validation.confirmNewPassword.required": "Confirm new password is required.",
      "validation.newPasswordMismatch": "New passwords do not match.",
      "changePassword.subtitle": "Update your account password to keep it secure.",
      "apiError.changePassword.currentPasswordIncorrect": "The current password entered is incorrect.",
      "apiError.changePassword.generic": "An unexpected error occurred while changing your password."
    }
  },
  pt: {
    translation: {
      "Clube Harmonia": "Clube Harmonia",
      "Home": "Home",
      "Eventos": "Eventos",
      "Calendário": "Calendário",
      "Notícias": "Notícias",
      "Contatos": "Contato",
      
      // Home Page
      "home.welcome": "Bem-vindo ao Clube Harmonia!",
      "home.heroSubtitle": "Seu refúgio de lazer, cultura e conexões. Descubra um universo de experiências memoráveis.",
      "home.upcomingEventsLink": "Próximos Eventos",
      "home.joinUsLink": "Associe-se",
      "home.activeMembers": "Membros Ativos",
      "home.eventsPerYear": "Eventos por Ano",
      "home.modernEnvironments": "Ambientes Modernos",
      "home.yearsOfTradition": "Anos de Tradição",
      "home.upcomingEventsTitle": "Próximos Eventos",
      "home.viewAllLink": "Ver Todos",
      "home.moreDetailsButton": "Mais Detalhes",
      "home.recentNewsTitle": "Últimas Notícias",
      "home.readMoreButton": "Leia Mais",
      "home.event.galaDinner.title": "Jantar de Gala Anual",
      "home.event.galaDinner.description": "Nosso tradicional jantar de gala com música ao vivo e premiações.",
      "home.event.chessTournament.title": "Torneio de Xadrez",
      "home.event.chessTournament.description": "Campeonato mensal de xadrez aberto a todos os membros.",
      "home.event.cookingWorkshop.title": "Workshop de Culinária Italiana",
      "home.event.cookingWorkshop.description": "Aprenda a fazer massas frescas e molhos clássicos com nosso chef convidado.",
      "home.news.fitnessPartnership.title": "Nova Parceria com Academia Fitness Premium",
      "home.news.fitnessPartnership.excerpt": "Excelente notícia para os sócios! Fechamos uma parceria com a Academia Fitness Premium, oferecendo descontos exclusivos em planos mensais e anuais.",
      "home.news.poolRenovation.title": "Renovação Completa da Piscina Principal",
      "home.news.poolRenovation.excerpt": "As obras de modernização da nossa piscina principal foram finalizadas. Venha conferir o novo sistema de aquecimento e a área de lazer renovada!",
      "home.publishedOn": "Publicado em: {{date}}",

      // Events Page
      "eventsPage.title": "Nossos Eventos",
      "eventsPage.subtitle": "Mantenha-se atualizado com a vibrante agenda de eventos do Clube Harmonia. De workshops culturais a competições esportivas, há sempre algo acontecendo!",
      "eventsPage.noEventsTitle": "Nenhum Evento Agendado",
      "eventsPage.noEventsSubtitle": "Volte em breve para conferir nossa programação futura!",
      "event.participantsText": "{{count}} participantes {{statusAffix}}",
      "event.participants.expected": "esperados",
      "event.participants.confirmed": "confirmados",
      // Categorias de Eventos
      "event.category.Social": "Social",
      "event.category.Esportivo": "Esportivo",
      "event.category.Cultural": "Cultural",
      "event.category.Educacional": "Educacional",
      // Status de Eventos
      "event.status.Inscrições Abertas": "Inscrições Abertas",
      "event.status.Quase Lotado": "Quase Lotado",
      "event.status.Lotado": "Lotado",
      "event.status.Em Breve": "Em Breve",
      "event.status.Cancelado": "Cancelado",
      "event.status.Realizado": "Realizado",
      // Detalhes dos Eventos
      "event.galaDinner.title": "Jantar de Gala Anual do Clube Harmonia",
      "event.galaDinner.description": "Nosso tradicional jantar de gala com música ao vivo, premiações e excelentes oportunidades de networking. Dress code: traje social completo.",
      "event.chessTournament.title": "Grande Torneio de Xadrez do Clube",
      "event.chessTournament.description": "Demonstre sua estratégia no campeonato mensal de xadrez. Premiação especial para os três primeiros colocados. Inscrições limitadas!",
      "event.cookingWorkshop.title": "Workshop Exclusivo de Culinária Italiana",
      "event.cookingWorkshop.description": "Aprenda os segredos da autêntica culinária italiana com o renomado Chef Giovanni. Inclui degustação e certificado.",
      "event.investmentsTalk.title": "Palestra: O Futuro dos Investimentos Inteligentes",
      "event.investmentsTalk.description": "Especialista em mercado financeiro global apresenta tendências, inovações e oportunidades para o segundo semestre. Vagas limitadas.",
      "event.jazzNight.title": "Noite de Jazz & Blues Acústico",
      "event.jazzNight.description": "Uma noite mágica com o melhor do jazz e blues acústico. Ambiente intimista com vista panorâmica da cidade. Reserve sua mesa.",
      "event.tennisOpen.title": "Harmonia Open de Tênis - Edição de Inverno",
      "event.tennisOpen.description": "Participe do nosso tradicional torneio de tênis em duplas. Café da manhã especial e brindes para todos os atletas inscritos.",
      "event.filmFestival.title": "Festival de Cinema Clássico Francês",
      "event.filmFestival.description": "Uma semana dedicada aos grandes clássicos do cinema francês, com debates após as sessões. Pipoca e refrigerante por nossa conta!",
      "event.masqueradeBall.title": "Baile de Máscaras: Uma Noite em Veneza",
      "event.masqueradeBall.description": "Prepare sua máscara e venha viver uma noite de mistério e glamour no nosso baile temático. Música, dança e surpresas! Ressaltamos que o uso de máscara é obrigatório para entrada no evento.",

      // Locais de Eventos
      "location.mainHall": "Salão Principal",
      "location.gamesRoom": "Sala de Jogos",
      "location.gourmetKitchen": "Cozinha Gourmet",
      "location.nobleHall": "Salão Nobre",
      "location.mainAuditorium": "Auditório Principal",
      "location.panoramicLounge": "Lounge Panorâmico",
      "location.tennisCourts": "Quadras de Tênis",
      "location.cinemaRoom": "Sala de Cinema",
      "location.imperialHall": "Salão Imperial",

      // News Page & News Card
      "newsPage.title": "Notícias do Clube",
      "newsPage.subtitle": "Mantenha-se informado sobre tudo o que acontece no Clube Harmonia. Atualizações, comunicados e histórias especiais.",
      "newsPage.noNewsTitle": "Nenhuma Notícia Disponível",
      "newsPage.noNewsSubtitle": "Não há artigos de notícias no momento. Por favor, volte mais tarde.",
      "newsCard.readFullArticle": "Ler Artigo Completo",
      "newsCard.categoryLabel": "Categoria: ",

      // Categorias de Notícias (exemplos)
      "news.category.ClubUpdates": "Atualizações do Clube",
      "news.category.MemberSpotlight": "Destaque do Sócio",
      "news.category.SpecialEvents": "Eventos Especiais",
      "news.category.Maintenance": "Manutenção e Melhorias",
      
      // Notícias mock (títulos e resumos) - expandir conforme useNewsData
      "news.article1.title": "Inaugurado Novo Complexo de Piscinas",
      "news.article1.summary": "Após meses de reforma, nosso novo complexo aquático está pronto! Piscinas modernas, novos vestiários e lanchonete.",
      "news.article2.title": "Assembleia Anual de Sócios Agendada",
      "news.article2.summary": "A assembleia anual ocorrerá no dia 15 de Julho. Confira a pauta e participe das decisões do clube.",
      "news.article3.title": "Clube Harmonia Brilha em Torneio Regional de Tênis",
      "news.article3.summary": "Nossos atletas trouxeram para casa três troféus do último torneio regional de tênis. Parabéns à equipe!",
      "news.article4.title": "Festival Gastronômico em Agosto",
      "news.article4.summary": "Prepare-se para uma jornada de sabores! O Festival Gastronômico Harmonia contará com jantares temáticos e chefs renomados.",
      "news.article5.title": "Importante: Manutenção no Sistema Dia 05/Jul",
      "news.article5.summary": "Nossos sistemas online, incluindo reservas e pagamentos, estarão indisponíveis das 02h às 06h do dia 05 de Julho para manutenção programada.",

      // Calendar Page
      "calendarPage.title": "Calendário de Eventos do Clube",
      "calendarPage.subtitle": "Explore nossa agenda completa de atividades e não perca nenhum evento importante.",
      "calendar.today": "Hoje",
      "calendar.previous": "Anterior",
      "calendar.next": "Próximo",
      "calendar.month": "Mês",
      "calendar.week": "Semana",
      "calendar.day": "Dia",
      "calendar.agenda": "Agenda",
      "calendar.noEventsInRange": "Nenhum evento programado para este período.",
      "calendar.allDay": "Dia inteiro",
      "calendar.showMore": "+{{count}} mais",

      // Contact Page
      "contactPage.title": "Entre em Contato",
      "contactPage.subtitle": "Estamos aqui para ajudar. Envie-nos uma mensagem ou faça-nos uma visita.",
      "contactPage.formTitle": "Envie uma Mensagem",
      "contactPage.form.nameLabel": "Nome Completo",
      "contactPage.form.namePlaceholder": "Digite seu nome completo",
      "contactPage.form.emailLabel": "Endereço de Email",
      "contactPage.form.emailPlaceholder": "seu.email@exemplo.com.br",
      "contactPage.form.subjectLabel": "Assunto",
      "contactPage.form.subjectPlaceholder": "Como podemos te ajudar?",
      "contactPage.form.messageLabel": "Mensagem",
      "contactPage.form.messagePlaceholder": "Escreva sua mensagem aqui...",
      "contactPage.form.submitButton": "Enviar Mensagem",
      "contactPage.form.submitting": "Enviando...",
      "contactPage.form.successMessage": "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      "contactPage.form.errorMessage": "Falha ao enviar mensagem. Por favor, tente novamente mais tarde.",
      "contactPage.infoTitle": "Nossas Informações",
      "contactPage.address": "Rua Alegria, 123, Cidade Feliz - ES, Brasil",
      "contactPage.phone": "(27) 3333-4444",
      "contactPage.email": "contato@clubeharmonia.com.br",
      "contactPage.openingHours": "Horário de Funcionamento",
      "contactPage.hoursMonFri": "Segunda a Sexta: 08h - 22h",
      "contactPage.hoursSatSun": "Sábado e Domingo: 09h - 20h",
      "contactPage.mapTitle": "Nossa Localização no Mapa",
      // Validações do formulário
      "validation.name.required": "O nome completo é obrigatório.",
      "validation.email.required": "O email é obrigatório.",
      "validation.email.invalid": "Por favor, insira um endereço de email válido.",
      "validation.subject.required": "O assunto é obrigatório.",
      "validation.message.required": "A mensagem é obrigatória.",
      "validation.message.minLength": "A mensagem deve ter pelo menos {{count}} caracteres.",
      "validation.password.required": "A senha é obrigatória.",
      "validation.password.minLength:6": "A senha deve ter pelo menos 6 caracteres.",
      "validation.confirmPassword.required": "A confirmação da senha é obrigatória.",

      // Error messages for data fetching
      "error.genericTitle": "Ocorreu um Erro",
      "error.fetchDataError": "Não foi possível carregar os dados solicitados. Por favor, tente novamente mais tarde.",
      "error.noDataTitle": "Sem Dados",
      "error.noDataAvailable": "Não há dados para exibir no momento.",

      // News Detail Page
      "newsDetailPage.notFoundTitle": "Artigo de Notícia Não Encontrado",
      "newsDetailPage.notFoundText": "O artigo de notícia que você está procurando não foi encontrado ou não existe.",
      "newsDetailPage.contentUnavailable": "O conteúdo completo para este artigo está indisponível no momento.",
      "newsDetailPage.loremIpsum": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

      // Event Detail Page
      "eventDetailPage.title": "Detalhes do Evento",
      "eventDetailPage.notFoundTitle": "Evento Não Encontrado",
      "eventDetailPage.notFoundText": "O evento que você está procurando não foi encontrado ou não existe.",
      "eventDetailPage.descriptionTitle": "Descrição do Evento",
      "eventDetailPage.informationTitle": "Informações do Evento",
      "eventDetailPage.dateLabel": "Data:",
      "eventDetailPage.timeLabel": "Horário:",
      "eventDetailPage.locationLabel": "Local:",
      "eventDetailPage.categoryLabel": "Categoria:",
      "eventDetailPage.statusLabel": "Status:",
      "eventDetailPage.participantsLabel": "Participantes:",
      "eventDetailPage.organizerLabel": "Organizador:",
      "eventDetailPage.contactLabel": "Contato:",
      "eventDetailPage.registerButton": "Inscrever-se no Evento",
      "eventDetailPage.viewOnCalendarButton": "Ver no Calendário",
      "eventDetailPage.fullDescriptionUnavailable": "A descrição completa para este evento está indisponível no momento.",

      // Navigation
      "navigation.goBackButton": "Voltar",

      // Breadcrumbs
      "breadcrumb.newsDetail": "Notícia: {{newsId}}", // Provisório, idealmente seria o título
      "breadcrumb.eventDetail": "Evento: {{eventId}}", // Provisório, idealmente seria o título
      "breadcrumb.detail": "Detalhes",

      // Pagination
      "pagination.previous": "Anterior",
      "pagination.next": "Próxima",
      "pagination.page": "Página {{currentPage}} de {{totalPages}}",
      "pagination.goToPage": "Ir para página {{pageNumber}}",
      
      // General UI
      "Loading...": "Carregando...",

      // Filters & Sorting
      "filterSort.title": "Filtros e Ordenação",
      "filterSort.filterBy": "Filtrar por",
      "filterSort.sortBy": "Ordenar por",
      "filterSort.allCategories": "Todas as Categorias",
      "filterSort.allStatuses": "Todos os Status",
      "filterSort.clearFilters": "Limpar Filtros",
      "filterSort.apply": "Aplicar",
      // Sorting Options
      "sort.dateDesc": "Data (Mais Recentes)",
      "sort.dateAsc": "Data (Mais Antigos)",
      "sort.titleAsc": "Título (A-Z)",
      "sort.titleDesc": "Título (Z-A)",
      "sort.participantsDesc": "Participantes (Mais)",
      "sort.participantsAsc": "Participantes (Menos)",

      // Authentication & User
      "auth.loginTitle": "Entrar",
      "auth.loginButton": "Entrar",
      "auth.logoutButton": "Sair",
      "auth.registerTitle": "Registrar",
      "auth.registerButton": "Registrar",
      "auth.emailLabel": "Email",
      "auth.emailPlaceholder": "seu.email@exemplo.com.br",
      "auth.passwordLabel": "Senha",
      "auth.passwordPlaceholder": "Digite sua senha",
      "auth.confirmPasswordLabel": "Confirmar Senha",
      "auth.confirmPasswordPlaceholder": "Confirme sua senha",
      "auth.alreadyHaveAccount": "Já tem uma conta? Entre",
      "auth.dontHaveAccount": "Não tem uma conta? Registre-se",
      "auth.loginSuccess": "Login realizado com sucesso!",
      "auth.loginError": "Falha no login. Verifique suas credenciais.",
      "auth.registrationSuccess": "Registro realizado com sucesso! Você já pode fazer login.",
      "auth.registrationError": "Falha no registro. Por favor, tente novamente.",
      "auth.passwordMismatch": "As senhas não coincidem.",
      "auth.welcomeUser": "Bem-vindo(a), {{name}}!",
      "auth.myProfile": "Meu Perfil",
      "auth.notLoggedIn": "Você não está logado.",
      "auth.logoutSuccess": "Logout realizado com sucesso! Até a próxima.",
      "auth.logoutError": "Falha no logout. Tente novamente ou contate o suporte.",
      "auth.notAuthorizedErrorTitle": "Acesso Negado",
      "auth.notAuthorizedErrorDescription": "Você não tem permissão para acessar esta página.",

      "adminNav.dashboard": "Painel Admin",

      "auth.userMenuMobile": "Menu de {{name}}",

      // User Profile Page
      "userProfile.title": "Perfil do Usuário",
      "userProfile.personalInfo": "Informações Pessoais",
      "userProfile.memberSince": "Membro desde: {{date}}",
      "userProfile.accountType": "Tipo de Conta: {{type}}",
      "userProfile.edit.title": "Editar Perfil",
      "userProfile.edit.button": "Editar Perfil",
      "userProfile.edit.saveButton": "Salvar Alterações",
      "userProfile.edit.cancelButton": "Cancelar",
      "userProfile.edit.success": "Perfil atualizado com sucesso!",
      "userProfile.edit.error": "Falha ao atualizar o perfil. Por favor, tente novamente.",
      "userRole.member": "Membro Associado",
      "userProfile.memberIdLabel": "ID de Membro:",
      "userProfile.registrationDateLabel": "Data de Registro:",
      "userRole.admin": "Administrador",
      "userProfile.changePasswordButton": "Alterar Senha",

      // API Error Messages
      "apiError.login.fetchUsersFailed": "Erro de sistema durante o login. Por favor, tente mais tarde.",
      "apiError.login.invalidCredentials": "Email ou senha inválidos. Verifique e tente novamente.",
      "apiError.register.checkEmailFailed": "Erro de sistema durante o registro. Por favor, tente mais tarde.",
      "apiError.register.emailInUse": "Este endereço de email já está em uso. Por favor, utilize um email diferente.",
      "apiError.register.genericFailed": "Não foi possível completar o registro. Por favor, tente novamente.",
      "apiError.profile.fetchUserFailed": "Não foi possível carregar os dados do usuário para atualização. Tente novamente.",
      "apiError.profile.notAuthenticated": "Você precisa estar logado para atualizar seu perfil.",
      "apiError.profile.updateFailed": "Falha ao salvar as alterações do perfil no servidor. Tente novamente.",

      // Change Password Page
      "changePassword.title": "Alterar Senha",
      "changePassword.currentPasswordLabel": "Senha Atual",
      "changePassword.currentPasswordPlaceholder": "Digite sua senha atual",
      "changePassword.newPasswordLabel": "Nova Senha",
      "changePassword.newPasswordPlaceholder": "Digite sua nova senha",
      "changePassword.confirmNewPasswordLabel": "Confirmar Nova Senha",
      "changePassword.confirmNewPasswordPlaceholder": "Confirme sua nova senha",
      "changePassword.saveButton": "Alterar Senha",
      "changePassword.success": "Senha alterada com sucesso!",
      "changePassword.error": "Falha ao alterar a senha. Por favor, tente novamente.",
      "validation.currentPassword.required": "A senha atual é obrigatória.",
      "validation.newPassword.required": "A nova senha é obrigatória.",
      "validation.newPassword.minLength:8": "A nova senha deve ter pelo menos 8 caracteres.",
      "validation.confirmNewPassword.required": "A confirmação da nova senha é obrigatória.",
      "validation.newPasswordMismatch": "As novas senhas não coincidem.",
      "changePassword.subtitle": "Atualize a senha da sua conta para mantê-la segura.",
      "apiError.changePassword.currentPasswordIncorrect": "A senha atual informada está incorreta.",
      "apiError.changePassword.generic": "Ocorreu um erro inesperado ao alterar sua senha."
    }
  }
};

i18n
  .use(LanguageDetector) // Detecta o idioma do usuário
  .use(initReactI18next) // Passa a instância do i18n para o react-i18next
  .init({
    resources,
    fallbackLng: 'pt', // Idioma padrão se a detecção falhar ou o idioma não estiver disponível
    debug: process.env.NODE_ENV === 'development', // Logs no console em desenvolvimento
    interpolation: {
      escapeValue: false, // React já faz o escape para proteger contra XSS
    },
    detection: {
      // Ordem e de onde detectar o idioma
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'], // Onde guardar o idioma detectado
    }
  });

export default i18n; 