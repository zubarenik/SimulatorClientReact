import { Mail, Award, Book, User, Settings, BarChart2, ShoppingBag, CreditCard, HelpCircle } from 'react-feather'

export default [
  {
    id: 'lessonsPage',
    title: 'Уроки',
    icon: <Award size={20} />,
    navLink: '/simulator/:sim_id/lessons'
  },
  {
    id: 'charactersPage',
    title: 'Персонажи',
    icon: <User/>,
    navLink: '/simulator/:sim_id/characters'
  },
  {
    id: 'theoryPage',
    title: 'Теория',
    icon: <Book size={20} />,
    navLink: '/simulator/:sim_id/theory'
  },
  {
    id: 'usersPage',
    title: 'Пользователи',
    icon: <User size={20} />,
    navLink: '/simulator/:sim_id/users'
  },
  {
    id: 'statisticsPage',
    title: 'Статистика',
    icon: <BarChart2 size={20} />,
    navLink: '/simulator/:sim_id/statistics'
  },
  {
    id: 'shopPage',
    title: 'Магазин',
    icon: <ShoppingBag size={20} />,
    navLink: '/simulator/:sim_id/shop'
  },
  {
    id: 'promocodesPage',
    title: 'Промокоды',
    icon: <CreditCard size={20} />,
    navLink: '/simulator/:sim_id/promocodes'
  },
  {
    id: 'requestsPage',
    title: 'Запросы на комментарии',
    icon: <HelpCircle size={20} />,
    navLink: '/simulator/:sim_id/requests'
  },
  {
    id: 'settingsPage',
    title: 'Настройки',
    icon: <Settings size={20} />,
    navLink: '/simulator/:sim_id/settings'
  },
  {
    id: 'triggersPage',
    title: 'Тригеры',
    icon: <Mail size={20} />,
    navLink: '/simulator/:sim_id/triggers'
  }
]
