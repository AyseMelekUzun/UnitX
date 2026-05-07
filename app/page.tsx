"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  User,
  BookOpen,
  MessageCircle,
  Trophy,
  Calendar,
  Target,
  Sparkles,
  ChevronRight,
  Award,
  X,
  Info,
} from "lucide-react";

// Text constants to avoid hydration issues with Turkish characters
const TEXTS = {
  todaysTasks: "Bug\u00FCn\u00FCn G\u00F6revleri",
  askQuestion: "Soru Sor",
  journeyStages: "Yolculuk A\u015Famalar\u0131",
  earnedBadges: "Kazan\u0131lan Rozetler",
  employeeName: "\u00C7al\u0131\u015Fan Ad\u0131",
  generalProgress: "Genel \u0130lerleme",
  total: "Toplam",
  completed: "Tamamlanan",
  remaining: "Kalan",
  tasks: "g\u00F6rev",
  stages: "a\u015Fama",
  complete: "Tamamla",
  clear: "Temizle",
  ask: "Sor",
  response: "Yan\u0131t",
  allTasksCompleted: "T\u00FCm g\u00F6revleri tamamlad\u0131n!",
  greatJob: "Harika i\u015F \u00E7\u0131kard\u0131n.",
  badge: "Rozet",
  quickGuide: "Oryantasyon veya s\u00FCre\u00E7lerle ilgili h\u0131zl\u0131 y\u00F6nlendirme al.",
  placeholder: "\u00D6rn: \u0130zin s\u00FCreci nas\u0131ld\u0131?",
  namePlaceholder: "Ad Soyad",
  uniteksAkademi: "\u00DCniteks Akademi",
  orientationJourney: "Oryantasyon Yolculu\u011Fu",
  newEmployee: "Yeni \u00C7al\u0131\u015Fan",
  whatToDo: "Yapman Gerekenler",
  tip: "\u0130pucu",
  close: "Kapat",
  markComplete: "G\u00F6revi Tamamla",
  taskDetails: "G\u00F6rev Detaylar\u0131",
  stageProgress: "A\u015Fama \u0130lerlemesi",
  progress: "\u0130lerleme",
  completed2: "Tamamland\u0131",
  viewDetails: "Detaylar",
};

const journeyStages = [
  {
    id: "gun1",
    title: "G\u00FCn 1",
    description: "\u0130lk g\u00FCn i\u00E7in temel tan\u0131\u015Fma ve ba\u015Flang\u0131\u00E7 ad\u0131mlar\u0131",
    icon: Calendar,
    tasks: [
      {
        id: "g1-1",
        title: "Ekibini tan\u0131",
        description: "Y\u00F6neticin ve yak\u0131n \u00E7al\u0131\u015Faca\u011F\u0131n ekip \u00FCyeleriyle tan\u0131\u015F.",
        details: {
          steps: [
            "Y\u00F6neticinle tan\u0131\u015Fma toplant\u0131s\u0131 ayarla",
            "Ekip \u00FCyelerinin isimlerini ve rollerini \u00F6\u011Fren",
            "Kiminle hangi konuda ileti\u015Fime ge\u00E7ece\u011Fini not al",
            "Ekip ileti\u015Fim kanallar\u0131na (Slack, Teams vb.) kat\u0131l"
          ],
          tip: "Herkesin ismini hat\u0131rlamak zor olabilir, not almaktan \u00E7ekinme!"
        }
      },
      {
        id: "g1-2",
        title: "Sistem giri\u015Flerini kontrol et",
        description: "Gerekli platformlara eri\u015Fim ve giri\u015F bilgilerini do\u011Frula.",
        details: {
          steps: [
            "E-posta hesab\u0131na giri\u015F yap",
            "LMS platformuna eri\u015Fimi kontrol et",
            "\u0130\u00E7 portal ve uygulamalara giri\u015F bilgilerini test et",
            "VPN ba\u011Flant\u0131s\u0131n\u0131 kontrol et (gerekiyorsa)"
          ],
          tip: "Eri\u015Fim sorunu ya\u015Farsan IT destek ekibine ula\u015F."
        }
      },
      {
        id: "g1-3",
        title: "\u0130lk oryantasyon toplant\u0131s\u0131na kat\u0131l",
        description: "\u015Eirket yap\u0131s\u0131 ve s\u00FCre\u00E7ler hakk\u0131nda temel bilgilendirmeyi tamamla.",
        details: {
          steps: [
            "Takvimindeki oryantasyon davetini kabul et",
            "Toplant\u0131ya zaman\u0131nda kat\u0131l",
            "\u015Eirket k\u00FClt\u00FCr\u00FC ve de\u011Ferlerini dinle",
            "Sorular\u0131n\u0131 not al ve sor"
          ],
          tip: "Kamera a\u00E7\u0131k kat\u0131lmak ilk izlenimi g\u00FC\u00E7lendirir."
        }
      },
      {
        id: "g1-4",
        title: "\u0130lk g\u00FCn rehberini incele",
        description: "\u0130lk g\u00FCn yap\u0131lacaklar listesini ve ileti\u015Fim kanallar\u0131n\u0131 g\u00F6zden ge\u00E7ir.",
        details: {
          steps: [
            "Ho\u015Fgeldin dok\u00FCman\u0131n\u0131 oku",
            "\u00D6nemli ileti\u015Fim bilgilerini kaydet",
            "Acil durumlar i\u00E7in kimi arayaca\u011F\u0131n\u0131 \u00F6\u011Fren",
            "\u0130lk hafta program\u0131n\u0131 g\u00F6zden ge\u00E7ir"
          ],
          tip: "Dok\u00FCmanlar\u0131 kolay eri\u015Filebilir bir yere kaydet."
        }
      },
    ],
  },
  {
    id: "ilkhafta",
    title: "\u0130lk Hafta",
    description: "Adaptasyon ve temel s\u00FCre\u00E7leri tan\u0131ma a\u015Famas\u0131",
    icon: BookOpen,
    tasks: [
      {
        id: "h1-1",
        title: "Zorunlu e\u011Fitimleri g\u00F6r\u00FCnt\u00FCle",
        description: "LMS \u00FCzerindeki ilk e\u011Fitim i\u00E7eriklerini a\u00E7 ve incele.",
        details: {
          steps: [
            "LMS platformuna giri\u015F yap",
            "Sana atanm\u0131\u015F e\u011Fitimleri listele",
            "E\u011Fitimlerin son teslim tarihlerini kontrol et",
            "\u0130lk e\u011Fitimi ba\u015Flat ve ilerlemeni takip et"
          ],
          tip: "E\u011Fitimleri k\u00FC\u00E7\u00FCk par\u00E7alara b\u00F6lerek g\u00FCnde 30 dakika ay\u0131rabilirsin."
        }
      },
      {
        id: "h1-2",
        title: "Bir temel e\u011Fitimi tamamla",
        description: "\u0130lk hafta i\u00E7in belirlenen en az bir e\u011Fitimi bitir.",
        details: {
          steps: [
            "En k\u0131sa s\u00FCreli e\u011Fitimi se\u00E7",
            "Sessiz bir ortamda e\u011Fitimi tamamla",
            "Quiz veya de\u011Ferlendirmeyi ge\u00E7",
            "Sertifikan\u0131 veya tamamlama belgesini kaydet"
          ],
          tip: "Anlamad\u0131\u011F\u0131n k\u0131s\u0131mlar\u0131 tekrar izleyebilirsin."
        }
      },
      {
        id: "h1-3",
        title: "Y\u00F6neticinle k\u0131sa check-in yap",
        description: "\u0130lk hafta deneyimini payla\u015F ve varsa sorular\u0131n\u0131 ilet.",
        details: {
          steps: [
            "Y\u00F6neticinle 15-30 dakikal\u0131k bir g\u00F6r\u00FC\u015Fme planla",
            "\u0130lk hafta izlenimlerini payla\u015F",
            "Tak\u0131ld\u0131\u011F\u0131n noktalar\u0131 sor",
            "Beklentileri ve \u00F6ncelikleri nettle\u015Ftir"
          ],
          tip: "Sorular\u0131n\u0131 \u00F6nceden yaz\u0131p haz\u0131rl\u0131kl\u0131 git."
        }
      },
      {
        id: "h1-4",
        title: "\u015Eirket i\u00E7i temel s\u00FCre\u00E7leri incele",
        description: "\u0130zin, masraf, ileti\u015Fim ve onay s\u00FCre\u00E7lerine g\u00F6z at.",
        details: {
          steps: [
            "\u0130zin talep s\u00FCrecini \u00F6\u011Fren",
            "Masraf beyan\u0131 nas\u0131l yap\u0131l\u0131r \u00F6\u011Fren",
            "Onay mekanizmalar\u0131n\u0131 anla",
            "Gerekli formlar\u0131n nerede oldu\u011Funu \u00F6\u011Fren"
          ],
          tip: "\u0130K portal\u0131nda \u00E7o\u011Fu bilgi mevcut olabilir."
        }
      },
    ],
  },
  {
    id: "ilkay",
    title: "\u0130lk Ay",
    description: "S\u00FCre\u00E7lere daha aktif dahil olma ve peki\u015Ftirme ad\u0131mlar\u0131",
    icon: Target,
    tasks: [
      {
        id: "a1-1",
        title: "Bir s\u00FCre\u00E7te aktif g\u00F6rev al",
        description: "Ekibinle birlikte k\u00FC\u00E7\u00FCk bir i\u015F ak\u0131\u015F\u0131na dahil ol.",
        details: {
          steps: [
            "Y\u00F6neticinden sana uygun bir g\u00F6rev iste",
            "G\u00F6revin kapsam\u0131n\u0131 ve beklentileri nettle\u015Ftir",
            "Gerekti\u011Finde ekip arkada\u015Flar\u0131ndan destek al",
            "G\u00F6revi tamamla ve geri bildirim iste"
          ],
          tip: "K\u00FC\u00E7\u00FCk ad\u0131mlarla ba\u015Fla, zamanla daha b\u00FCy\u00FCk sorumluluklar alabilirsin."
        }
      },
      {
        id: "a1-2",
        title: "Bir soru sor ve kaynak bul",
        description: "Merak etti\u011Fin bir konuda do\u011Fru ki\u015Fiye ya da do\u011Fru kayna\u011Fa ula\u015F.",
        details: {
          steps: [
            "Merak etti\u011Fin bir konuyu belirle",
            "Bu konuda kimin uzman oldu\u011Funu \u00F6\u011Fren",
            "K\u0131sa bir mesaj veya toplant\u0131 ile sorunu ilet",
            "Ald\u0131\u011F\u0131n bilgiyi not al ve uygula"
          ],
          tip: "Soru sormak \u00F6\u011Frenmenin en h\u0131zl\u0131 yoludur, \u00E7ekinme!"
        }
      },
      {
        id: "a1-3",
        title: "\u0130lk ay geri bildirimi payla\u015F",
        description: "Oryantasyon s\u00FCreciyle ilgili k\u0131sa de\u011Ferlendirme gir.",
        details: {
          steps: [
            "Oryantasyon deneyimini d\u00FC\u015F\u00FCn",
            "Neyin iyi gitti\u011Fini ve geli\u015Ftirilebilece\u011Fini belirle",
            "\u0130K veya y\u00F6neticine geri bildirim formunu doldur",
            "\u00D6nerilerini a\u00E7\u0131k\u00E7a payla\u015F"
          ],
          tip: "Yap\u0131c\u0131 geri bildirimler s\u00FCreci herkes i\u00E7in iyile\u015Ftirir."
        }
      },
      {
        id: "a1-4",
        title: "Geli\u015Fim alan\u0131n\u0131 belirle",
        description: "\u00D6\u011Frenmek istedi\u011Fin bir alan\u0131 se\u00E7 ve bir sonraki ad\u0131m\u0131n\u0131 planla.",
        details: {
          steps: [
            "Hangi konuda geli\u015Fmek istedi\u011Fini d\u00FC\u015F\u00FCn",
            "LMS'te ilgili e\u011Fitimleri ara",
            "Y\u00F6neticinle bu hedefi payla\u015F",
            "\u0130lk ad\u0131m\u0131 planla ve takvime ekle"
          ],
          tip: "Hedefini yaz\u0131l\u0131 hale getirmek motivasyonu art\u0131r\u0131r."
        }
      },
    ],
  },
];

const quickAnswers = [
  {
    keywords: ["izin", "leave"],
    answer:
      "İzin süreçlerinde ilk adım yöneticinle planı netleştirmek, sonra şirket içinde kullanılan resmi talep kanalını takip etmektir. Emin değilsen yöneticine veya İK ekibine danışman en doğru yol olur.",
  },
  {
    keywords: ["masraf", "harcama"],
    answer:
      "Masraf süreçlerinde belge, tarih ve açıklama bilgilerini eksiksiz toplaman gerekir. Önce ekibindeki uygulamayı öğren, ardından kullanılan onay akışını takip et.",
  },
  {
    keywords: ["lms", "eğitim"],
    answer:
      "LMS tarafında önce atanmış eğitimlerini ve son tarihlerini kontrol et. Bir içerik görünmüyorsa yöneticine veya akademi ekibine atama durumunu sorman faydalı olur.",
  },
  {
    keywords: ["oryantasyon", "onboarding"],
    answer:
      "Oryantasyonda amaç her şeyi bir günde bitirmek değil, ilk gün, ilk hafta ve ilk ay içinde temel konuları rahatça tamamlamandır. Görev listeni adım adım ilerletmen yeterli.",
  },
  {
    keywords: ["ekip", "tanışma"],
    answer:
      "Yeni ekip ortamında önce yakın çalışacağın kişilerle tanışman, beklentileri anlaman ve iletişim kanallarını öğrenmen adaptasyonu hızlandırır.",
  },
];

const specialBadges: Record<string, { title: string; icon: string }> = {
  "g1-1": { title: "Buddy ile tanıştın", icon: "🤝" },
  "g1-3": { title: "İlk toplantını tamamladın", icon: "🎉" },
  "h1-2": { title: "İlk eğitimi bitirdin", icon: "📚" },
  "a1-1": { title: "İlk aktif görevin", icon: "🚀" },
  "a1-3": { title: "Geri bildirim verdin", icon: "💬" },
};

function getWelcomeMessage(progress: number): string {
  if (progress === 0) return "Hoş geldin! Yolculuğa başlamak için ilk görevini tamamla.";
  if (progress < 35) return "Güzel başlangıç. İlk adımları tamamlamaya devam et.";
  if (progress < 70) return "İyi gidiyorsun. Adaptasyon sürecin düzenli ilerliyor.";
  if (progress < 100) return "Harika. Yolculuğun büyük kısmını tamamladın.";
  return "Tebrikler! Oryantasyon yolculuğunu tamamladın.";
}

export default function
  AkademiYolculukAsistani() {
  const allTasks = journeyStages.flatMap((stage) =>
    stage.tasks.map((task) => ({
      ...task,
      stageId: stage.id,
      stageTitle: stage.title,
    }))
  );

  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [activeStage, setActiveStage] = useState("gun1");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [toast, setToast] = useState("");
  const [badges, setBadges] = useState<{ title: string; icon: string }[]>([]);
  const [userName, setUserName] = useState(TEXTS.newEmployee);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);
  const [latestBadge, setLatestBadge] = useState<{
    title: string;
    icon: string;
  } | null>(null);
  const [selectedTask, setSelectedTask] = useState<{
    id: string;
    title: string;
    description: string;
    stageTitle?: string;
    details: { steps: string[]; tip: string };
  } | null>(null);

  const [requests, setRequests] = useState([
    {
      id: 1,
      status: "Bekliyor",
      category: "Süreç",
      text: "İlk hafta görev önceliklerini netleştirmekte zorlandım.",
      date: "2 gün önce",
    },
    {
      id: 2,
      status: "Yanıtlandı",
      category: "Oryantasyon",
      text: "Oryantasyon sonrası hangi kaynaklara bakmam gerektiğini netleştirmek istedim.",
      answer: "Öncelikle ilk hafta görev ekranındaki adımları tamamlaman yeterli.",
      date: "Dün",
    },
  ]);

  const [newRequest, setNewRequest] = useState("");
  const [category, setCategory] = useState("Süreç");

  const totalTasks = allTasks.length;
  const completedCount = completedTasks.length;
  const progress = Math.round((completedCount / totalTasks) * 100);

  const todaysTasks = useMemo(() => {
    return allTasks.filter((task) => !completedTasks.includes(task.id)).slice(0, 3);
  }, [completedTasks, allTasks]);

  const activeStageData = journeyStages.find((stage) => stage.id === activeStage)!;

  const stageProgressMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const stage of journeyStages) {
      const done = stage.tasks.filter((task) =>
        completedTasks.includes(task.id)
      ).length;
      map[stage.id] = Math.round((done / stage.tasks.length) * 100);
    }
    return map;
  }, [completedTasks]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const exists = prev.includes(taskId);
      const next = exists ? prev.filter((id) => id !== taskId) : [...prev, taskId];
      const message = exists ? "Görev işareti kaldırıldı." : "Görev tamamlandı!";
      setToast(message);

      if (!exists && specialBadges[taskId]) {
        const badge = specialBadges[taskId];
        setBadges((prev) => {
          if (prev.some((b) => b.title === badge.title)) return prev;
          return [...prev, badge];
        });
        setLatestBadge(badge);
        setShowBadgeAnimation(true);
        setTimeout(() => setShowBadgeAnimation(false), 3000);
      }
      setTimeout(() => setToast(""), 2000);
      return next;
    });
  };

  const handleAsk = () => {
    const normalized = question.trim().toLowerCase();
    if (!normalized) {
      setAnswer("Lütfen bir soru yaz.");
      return;
    }
    const found = quickAnswers.find((item) =>
      item.keywords.some((keyword) => normalized.includes(keyword))
    );
    if (found) {
      setAnswer(found.answer);
      return;
    }
    setAnswer(
      "Bu konuda en doğru yönlendirme için önce yöneticine veya akademi ekibine kısa bir şekilde neye takıldığını yazman iyi olur. İstersen sorunu daha net ifade edecek şekilde yeniden sorabilirsin."
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && question.trim()) {
        e.preventDefault();
        handleAsk();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-100/50">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {TEXTS.uniteksAkademi}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {TEXTS.orientationJourney}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {badges.length} {TEXTS.badge}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <User className="h-4 w-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {userName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Card */}
        <section className="mb-8">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary via-primary/90 to-orange-400 p-6 text-primary-foreground shadow-lg sm:p-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <div>
                <label className="text-sm font-medium text-primary-foreground/80">
                  {TEXTS.employeeName}
                </label>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-2 w-full rounded-xl border-0 bg-white/30 px-4 py-3 text-primary-foreground placeholder-primary-foreground/60 outline-none backdrop-blur-sm transition focus:bg-white/40 focus:ring-2 focus:ring-white/50"
                  placeholder={TEXTS.namePlaceholder}
                />
                <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">
                  {getWelcomeMessage(progress)}
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-primary-foreground/80">
                      {TEXTS.generalProgress}
                    </span>
                    <span className="font-semibold text-primary-foreground">
                      %{progress}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/30">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-lg bg-white/20 p-2">
                      <div className="text-2xl font-bold text-primary-foreground">
                        {totalTasks}
                      </div>
                      <div className="text-xs text-primary-foreground/70">
                        {TEXTS.total}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/20 p-2">
                      <div className="text-2xl font-bold text-primary-foreground">
                        {completedCount}
                      </div>
                      <div className="text-xs text-primary-foreground/70">
                        {TEXTS.completed}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/20 p-2">
                      <div className="text-2xl font-bold text-primary-foreground">
                        {totalTasks - completedCount}
                      </div>
                      <div className="text-xs text-primary-foreground/70">
                        {TEXTS.remaining}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Today's Tasks & Q&A */}
          <div className="space-y-6 lg:col-span-1">
            {/* Today's Tasks */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  {TEXTS.todaysTasks}
                </h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {todaysTasks.length} {TEXTS.tasks}
                </span>
              </div>

              <div className="space-y-3">
                {todaysTasks.length > 0 ? (
                  todaysTasks.map((task) => (
                    <div
                      key={task.id}
                      className="group rounded-xl border border-border bg-muted/30 p-4 transition-all hover:border-primary/30 hover:bg-muted/50 hover:shadow-md"
                    >
                      <div className="mb-1 text-xs font-medium text-muted-foreground">
                        {task.stageTitle}
                      </div>
                      <h3 className="mb-2 font-medium text-card-foreground">
                        {task.title}
                      </h3>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                        {task.description}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedTask({
                            ...task,
                            details: task.details
                          })}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20"
                        >
                          <Info className="h-4 w-4" />
                          {TEXTS.viewDetails}
                        </button>
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-orange-500 hover:shadow-md"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          {TEXTS.complete}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                    <Award className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="text-sm font-medium text-card-foreground">
                      {TEXTS.allTasksCompleted}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {TEXTS.greatJob}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Q&A Section */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                <MessageCircle className="h-5 w-5 text-primary" />
                {TEXTS.askQuestion}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {TEXTS.quickGuide}
              </p>

              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                placeholder={TEXTS.placeholder}
                className="w-full rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleAsk}
                  className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-orange-500"
                >
                  {TEXTS.ask}
                </button>
                <button
                  onClick={() => {
                    setQuestion("");
                    setAnswer("");
                  }}
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted"
                >
                  {TEXTS.clear}
                </button>
              </div>

              {answer && (
                <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="mb-2 text-xs font-medium text-primary">
                    {TEXTS.response}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {answer}
                  </p>
                </div>
              )}
            </div>

            {/* Destek Talepleri */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-card-foreground">
                Destek Taleplerim
              </h2>

              <p className="mb-4 text-sm text-muted-foreground">
                Takıldığın konuyu yaz, destek kişi uygun olduğunda dönüş yapsın
              </p>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border px-3 py-2 mb-2"
              >
                <option>Süreç</option>
                <option>Sistem</option>
                <option>Eğitim</option>
                <option>Oryantasyon</option>
              </select>

              <textarea
                value={newRequest}
                onChange={(e) => setNewRequest(e.target.value)}
                placeholder="Takıldığın konuyu yaz..."
                className="w-full rounded-xl border border-border px-3 py-2"
              />

              <button
                onClick={() => {
                  if (!newRequest) return;
                  setRequests([
                    {
                      id: Date.now(),
                      status: "Bekliyor",
                      category,
                      text: newRequest,
                      date: "Az önce"
                    },
                    ...requests
                  ]);
                  setNewRequest("");
                }}
                className="mt-2 w-full rounded-xl bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-orange-500"
              >
                Talep Oluştur
              </button>

              <div className="mt-4 space-y-3">
                {requests.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border p-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{r.category}</span>
                      <span
                        className={`px-2 py-1 rounded-full ${r.status === "Bekliyor"
                            ? "bg-orange-100 text-orange-600"
                            : r.status === "Yanıtlandı"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                      >
                        {r.status}
                      </span>
                    </div>

                    <p className="text-sm">{r.text}</p>

                    {r.answer && (
                      <p className="text-sm text-green-600 mt-1">
                        {r.answer}
                      </p>
                    )}

                    <div className="text-xs text-muted-foreground mt-1">
                      {r.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                  <Trophy className="h-5 w-5 text-primary" />
                  {TEXTS.earnedBadges}
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {badges.map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2 text-sm"
                    >
                      <span className="text-lg">{badge.icon}</span>
                      <span className="text-xs font-medium text-foreground">
                        {badge.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Journey Stages */}
          <div className="space-y-6 lg:col-span-2">
            {/* Stage Tabs */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-card-foreground">
                  {TEXTS.journeyStages}
                </h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {journeyStages.length} {TEXTS.stages}
                </span>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {journeyStages.map((stage) => {
                  const StageIcon = stage.icon;
                  const isActive = activeStage === stage.id;
                  const stageProgress = stageProgressMap[stage.id];
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStage(stage.id)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "border border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted"
                        }`}
                    >
                      <StageIcon className="h-4 w-4" />
                      <span>{stage.title}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${isActive
                          ? "bg-white/20"
                          : stageProgress === 100
                            ? "bg-green-100 text-green-700"
                            : "bg-muted"
                          }`}
                      >
                        %{stageProgress}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Content */}
              <div className="rounded-xl border border-border bg-gradient-to-br from-muted/50 to-background p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      {React.createElement(activeStageData.icon, {
                        className: "h-5 w-5 text-primary",
                      })}
                      <span className="text-sm font-medium text-primary">
                        {activeStageData.title}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {activeStageData.description}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {TEXTS.stageProgress}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      %{stageProgressMap[activeStageData.id]}
                    </div>
                  </div>
                </div>

                <div className="mb-5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{
                      width: `${stageProgressMap[activeStageData.id]}%`,
                    }}
                  />
                </div>

                <div className="space-y-3">
                  {activeStageData.tasks.map((task) => {
                    const done = completedTasks.includes(task.id);
                    return (
                      <div
                        key={task.id}
                        className={`rounded-xl border p-4 transition-all ${done
                          ? "border-green-200 bg-green-50"
                          : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {done ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                            ) : (
                              <Circle className="h-6 w-6 text-muted-foreground hover:text-primary" />
                            )}
                          </button>
                          <div className="flex-1">
                            <h4
                              className={`font-medium ${done ? "text-green-800" : "text-card-foreground"}`}
                            >
                              {task.title}
                            </h4>
                            <p
                              className={`mt-1 text-sm leading-relaxed ${done ? "text-green-700" : "text-muted-foreground"}`}
                            >
                              {task.description}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2 pl-10">
                          <button
                            onClick={() => setSelectedTask({
                              id: task.id,
                              title: task.title,
                              description: task.description,
                              stageTitle: activeStageData.title,
                              details: task.details
                            })}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
                          >
                            <Info className="h-4 w-4" />
                            {TEXTS.viewDetails}
                          </button>
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${done
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-primary text-primary-foreground hover:bg-orange-500"
                              }`}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            {done ? TEXTS.completed2 : TEXTS.complete}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stage Overview Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {journeyStages.map((stage) => {
                const StageIcon = stage.icon;
                const stageProgress = stageProgressMap[stage.id];
                const isComplete = stageProgress === 100;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={`group rounded-xl border p-4 text-left transition-all hover:-translate-y-1 hover:shadow-md ${activeStage === stage.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                      }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${isComplete
                          ? "bg-green-100"
                          : activeStage === stage.id
                            ? "bg-primary/10"
                            : "bg-muted"
                          }`}
                      >
                        <StageIcon
                          className={`h-5 w-5 ${isComplete
                            ? "text-green-600"
                            : activeStage === stage.id
                              ? "text-primary"
                              : "text-muted-foreground"
                            }`}
                        />
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 ${activeStage === stage.id ? "text-primary" : ""
                          }`}
                      />
                    </div>
                    <h3 className="font-semibold text-card-foreground">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {stage.description}
                    </p>
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{TEXTS.progress}</span>
                        <span
                          className={`font-medium ${isComplete ? "text-green-600" : "text-primary"}`}
                        >
                          %{stageProgress}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isComplete
                            ? "bg-green-500"
                            : "bg-gradient-to-r from-primary to-secondary"
                            }`}
                          style={{ width: `${stageProgress}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="animate-in zoom-in-95 fade-in duration-300 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border p-5">
              <div>
                {selectedTask.stageTitle && (
                  <span className="mb-1 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                    {selectedTask.stageTitle}
                  </span>
                )}
                <h3 className="mt-2 text-xl font-bold text-card-foreground">
                  {selectedTask.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedTask.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="flex-shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-5">
              {/* Steps */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-card-foreground">
                  <Target className="h-4 w-4 text-primary" />
                  {TEXTS.whatToDo}
                </h4>
                <ol className="space-y-2">
                  {selectedTask.details.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <span className="text-sm text-card-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tip */}
              <div className="rounded-xl border border-accent bg-accent/10 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent-foreground">
                  <Sparkles className="h-4 w-4" />
                  {TEXTS.tip}
                </h4>
                <p className="text-sm text-accent-foreground/80">
                  {selectedTask.details.tip}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-border p-5">
              <button
                onClick={() => setSelectedTask(null)}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted"
              >
                {TEXTS.close}
              </button>
              <button
                onClick={() => {
                  toggleTask(selectedTask.id);
                  setSelectedTask(null);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <CheckCircle2 className="h-4 w-4" />
                {TEXTS.markComplete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badge Animation */}
      {showBadgeAnimation && latestBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
          <div className="animate-in zoom-in-95 fade-in duration-300 rounded-2xl border border-accent bg-card p-8 text-center shadow-2xl">
            <div className="mb-4 text-6xl">{latestBadge.icon}</div>
            <h3 className="mb-2 text-xl font-bold text-card-foreground">
              Yeni Rozet Kazand\u0131n!
            </h3>
            <p className="text-muted-foreground">{latestBadge.title}</p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
