import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'acceptance', 'goals', 'discipline', 'sport', 'dates', 'trends', 'horoscope'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена! 🎉',
      description: 'Мы свяжемся с тобой в течение 10 минут для оформления покупки.',
    });
    setIsDialogOpen(false);
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const zodiacSigns = [
    { name: 'Овен', dates: '21.03 - 19.04', icon: '♈', color: 'bg-red-100' },
    { name: 'Телец', dates: '20.04 - 20.05', icon: '♉', color: 'bg-green-100' },
    { name: 'Близнецы', dates: '21.05 - 20.06', icon: '♊', color: 'bg-yellow-100' },
    { name: 'Рак', dates: '21.06 - 22.07', icon: '♋', color: 'bg-blue-100' },
    { name: 'Лев', dates: '23.07 - 22.08', icon: '♌', color: 'bg-orange-100' },
    { name: 'Дева', dates: '23.08 - 22.09', icon: '♍', color: 'bg-pink-100' },
    { name: 'Весы', dates: '23.09 - 22.10', icon: '♎', color: 'bg-purple-100' },
    { name: 'Скорпион', dates: '23.10 - 21.11', icon: '♏', color: 'bg-red-200' },
    { name: 'Стрелец', dates: '22.11 - 21.12', icon: '♐', color: 'bg-indigo-100' },
    { name: 'Козерог', dates: '22.12 - 19.01', icon: '♑', color: 'bg-gray-100' },
    { name: 'Водолей', dates: '20.01 - 18.02', icon: '♒', color: 'bg-cyan-100' },
    { name: 'Рыбы', dates: '19.02 - 20.03', icon: '♓', color: 'bg-teal-100' }
  ];

  return (
    <div className="min-h-screen smooth-scroll">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BE YOU
          </h1>
          <div className="hidden md:flex gap-6">
            {['О гайде', 'Самопринятие', 'Цели', 'Дисциплина', 'Спорт', 'Свидания', 'Тренды', 'Гороскоп'].map((item, idx) => {
              const ids = ['about', 'acceptance', 'goals', 'discipline', 'sport', 'dates', 'trends', 'horoscope'];
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(ids[idx])}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === ids[idx] ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Купить гайд
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Получи гайд BE YOU
                </DialogTitle>
                <DialogDescription className="text-base">
                  Заполни форму и начни путь к лучшей версии себя уже сегодня
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Твое имя</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Анна"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="anna@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="border-border"
                  />
                </div>
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6">
                    Оформить за 1990₽
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Нажимая кнопку, ты соглашаешься с политикой конфиденциальности
                  </p>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-muted/20 to-primary/20" />
        <img 
          src="https://cdn.poehali.dev/projects/ead31472-01ee-47b3-b89b-6c37060cee3f/files/938cd886-d352-40da-8b2f-bb5682b4189b.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="container relative z-10 mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-7xl md:text-9xl font-bold mb-6 text-balance leading-tight">
            Твоя <span className="font-serif italic text-primary">лучшая</span><br />версия
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light">
            Гайд о том, как принимать себя каждый день, достигать целей и становиться сильнее
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent text-lg px-8 py-6 hover:scale-105 transition-transform"
            onClick={() => scrollToSection('about')}
          >
            Начать путь
          </Button>
        </div>
      </section>

      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-6">О гайде</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Это не просто книга — это твой личный наставник на пути к себе настоящей. 
                Практические инструменты, вдохновляющие истории и система, которая работает.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Heart', text: '7 глав о самопринятии' },
                  { icon: 'Target', text: 'Система достижения целей' },
                  { icon: 'Sparkles', text: 'Трекеры привычек' },
                  { icon: 'Star', text: 'Персональные рекомендации' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name={item.icon} size={20} className="text-primary" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/ead31472-01ee-47b3-b89b-6c37060cee3f/files/46ee27b6-c306-47f7-90d9-39f1095d0cec.jpg"
                alt="About"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="acceptance" className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-bold mb-4 text-center">Самопринятие</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Путь к любви к себе начинается здесь
          </p>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { 
                title: 'Твое тело — твой дом', 
                content: 'Научись принимать свое тело таким, какое оно есть. Каждая часть тебя уникальна и прекрасна. Практики благодарности телу помогут изменить отношение к себе.' 
              },
              { 
                title: 'Внутренний критик vs внутренний друг', 
                content: 'Замени самокритику на самоподдержку. Техники работы с внутренним диалогом, которые изменят твою жизнь. Научись говорить с собой так, как говоришь с лучшей подругой.' 
              },
              { 
                title: 'Отпусти перфекционизм', 
                content: 'Идеальность — это иллюзия. Реальность прекрасна в своем несовершенстве. Практики принятия себя "здесь и сейчас", медитации и упражнения на осознанность.' 
              },
              { 
                title: 'Твоя уникальность — твоя сила', 
                content: 'То, что отличает тебя от других — это не недостаток, а суперсила. Найди свои сильные стороны и научись транслировать их миру.' 
              }
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-border rounded-2xl px-6 bg-card">
                <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-4">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="goals" className="py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-4 text-center">Цели и мотивация</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Превращай мечты в реальность
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: 'Lightbulb', 
                title: 'Визуализация', 
                desc: 'Создай доску мечты и живи так, будто цель уже достигнута' 
              },
              { 
                icon: 'ListChecks', 
                title: 'SMART-цели', 
                desc: 'Система постановки целей, которая действительно работает' 
              },
              { 
                icon: 'Flame', 
                title: 'Мотивация', 
                desc: 'Найди свое "зачем" и никогда не сдавайся' 
              },
              { 
                icon: 'Calendar', 
                title: 'План действий', 
                desc: 'Разбей большую цель на маленькие шаги' 
              },
              { 
                icon: 'Trophy', 
                title: 'Празднуй успехи', 
                desc: 'Каждый шаг вперед заслуживает признания' 
              },
              { 
                icon: 'Rocket', 
                title: 'Действуй сейчас', 
                desc: 'Прокрастинация — враг прогресса. Начни с одного шага' 
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <Icon name={item.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="discipline" className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-5xl font-bold mb-4 text-center">Дисциплина</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Свобода через структуру
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                title: 'Утренний ритуал', 
                points: ['Просыпайся в одно время', 'Медитация 10 минут', 'Стакан воды', 'Планирование дня'] 
              },
              { 
                title: 'Вечерний ритуал', 
                points: ['Рефлексия дня', 'Благодарности', 'Подготовка к завтра', 'Сон в 22:00'] 
              },
              { 
                title: 'Правило 2 минут', 
                points: ['Начни с малого', 'Делай меньше, но постоянно', 'Качество важнее количества', 'Привычка = повторение'] 
              },
              { 
                title: 'Трекер привычек', 
                points: ['Отмечай каждый день', 'Не прерывай цепочку', 'Визуализируй прогресс', 'Награждай себя'] 
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-8 bg-gradient-to-br from-card to-muted/20">
                <h3 className="text-2xl font-bold mb-6 text-primary">{item.title}</h3>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} className="text-white" />
                      </div>
                      <span className="text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="sport" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-4 text-center">Спорт и здоровье</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Твое тело — твой храм
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { emoji: '🧘‍♀️', title: 'Йога', desc: 'Гибкость тела и ума' },
                { emoji: '🏃‍♀️', title: 'Кардио', desc: 'Энергия и выносливость' },
                { emoji: '💪', title: 'Силовые', desc: 'Сила и уверенность' },
                { emoji: '🩰', title: 'Танцы', desc: 'Радость движения' },
                { emoji: '🏊‍♀️', title: 'Плавание', desc: 'Гармония с водой' },
                { emoji: '🚴‍♀️', title: 'Велосипед', desc: 'Свобода и скорость' }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 text-center hover:shadow-lg transition-all hover:scale-105">
                  <div className="text-5xl mb-3">{item.emoji}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10">
              <h3 className="text-2xl font-bold mb-4">Твой план тренировок</h3>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  <strong>Понедельник:</strong> Силовая тренировка верха тела + йога
                </p>
                <p className="text-muted-foreground">
                  <strong>Среда:</strong> Кардио 30 мин + растяжка
                </p>
                <p className="text-muted-foreground">
                  <strong>Пятница:</strong> Силовая тренировка низа тела + пилатес
                </p>
                <p className="text-muted-foreground">
                  <strong>Выходные:</strong> Активный отдых — прогулки, танцы, плавание
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="dates" className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-5xl font-bold mb-4 text-center">Свидания с собой</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Время только для тебя
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: 'Coffee', title: 'Кофе в одиночестве', desc: 'Найди уютное кафе, возьми книгу или просто наблюдай за людьми' },
              { icon: 'Palette', title: 'Творческий вечер', desc: 'Рисование, лепка, каллиграфия — что угодно для души' },
              { icon: 'Sparkles', title: 'Spa-день дома', desc: 'Маски, ванна, свечи, любимая музыка' },
              { icon: 'ShoppingBag', title: 'Шопинг для себя', desc: 'Купи то, что давно хотела, без чувства вины' },
              { icon: 'Film', title: 'Кино в одиночку', desc: 'Выбери фильм, который хочешь именно ты' },
              { icon: 'BookOpen', title: 'Вечер с книгой', desc: 'Плед, чай и та самая книга с полки' },
              { icon: 'MapPin', title: 'Прогулка в парке', desc: 'Без наушников — только ты и природа' },
              { icon: 'Utensils', title: 'Ужин в ресторане', desc: 'Забронируй столик на одного — это роскошь' }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="trends" className="py-24 bg-gradient-to-br from-secondary/20 to-primary/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-5xl font-bold mb-4 text-center">Тренды 2026</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Будь в курсе, будь впереди
          </p>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-12">
            <img 
              src="https://cdn.poehali.dev/projects/ead31472-01ee-47b3-b89b-6c37060cee3f/files/faef5f91-b3eb-4691-a18a-08db63011d18.jpg"
              alt="Trends"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-4xl font-bold mb-2">Главные тренды года</h3>
              <p className="text-lg">Что будет модно, актуально и вдохновляюще</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'Leaf', title: 'Осознанность', desc: 'Slow living, минимализм, экология' },
              { icon: 'Heart', title: 'Self-care', desc: 'Забота о ментальном здоровье' },
              { icon: 'Users', title: 'Сообщество', desc: 'Женские круги и поддержка' },
              { icon: 'Zap', title: 'Энергия', desc: 'Виброрежимы и нейрофитнес' },
              { icon: 'Moon', title: 'Ритмы', desc: 'Жизнь по циклам и луне' },
              { icon: 'Sparkles', title: 'Аутентичность', desc: 'Быть собой — новый тренд' }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center bg-card/80 backdrop-blur">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="horoscope" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-4 text-center">Гороскоп на 2026</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Что говорят звезды о твоем пути
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {zodiacSigns.map((sign, idx) => (
              <Card 
                key={idx} 
                className={`p-6 text-center hover:shadow-xl transition-all hover:scale-105 cursor-pointer ${sign.color}`}
              >
                <div className="text-5xl mb-3">{sign.icon}</div>
                <h3 className="text-lg font-bold mb-1">{sign.name}</h3>
                <p className="text-xs text-muted-foreground">{sign.dates}</p>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-16">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10">
              <h3 className="text-2xl font-bold mb-4 text-center">Общий прогноз на год</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                2026 год — время трансформации и новых начинаний. Год, когда каждая из нас может 
                открыть в себе новые грани и воплотить давние мечты. Слушай свою интуицию, 
                доверяй процессу и помни — звезды всегда на твоей стороне.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Начни свой путь сегодня</h2>
          <p className="text-xl mb-8 text-background/80">
            Гайд, который изменит твою жизнь
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6">
                Купить гайд за 1990₽
              </Button>
            </DialogTrigger>
          </Dialog>
          <div className="mt-12 text-background/60 text-sm">
            <p>© 2026 BE YOU. Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;