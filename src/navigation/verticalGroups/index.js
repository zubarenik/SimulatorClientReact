import { Mail, Home, Settings, TrendingUp } from 'react-feather'

export default [
  {
    id: 'groupSettings',
    title: 'Настройки Группы',
    icon: <Settings size={20} />,
    navLink: '/simulators/settings'
  },
  {
    id: 'usersStat',
    title: 'Статистика группы',
    icon: <TrendingUp size={20} />,
    navLink: '/simulators/stat'
  }
]
