import Post from './components/Post.jsx'
import Header from './components/Header.jsx'
import './global.css'
import styles from './App.module.css'
import { Sidebar } from './components/Sidebar.jsx'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/danvieira97.png',
      name: 'Danilo Vieira',
      role: 'Full Stack Developer',
      githubLink: 'https://github.com/danvieira97',
      githubUser: 'danvieira97'
    },
    content: 'Fala Galera. Estou começando mais um curso da Rocketseat, espero aprender e aprimorar mais meus conhecimentos.',
    publishedAt: new Date('2023-06-26 17:45:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/JairFreireJunior.png',
      name: 'Jair Freire',
      role: 'Full Stack Developer',
      githubLink: 'https://github.com/JairFreireJunior',
      githubUser: 'JairFreireJunior'
    },
    content: 'Estou muito feliz de estar trabalhando com o melhorzin agora. Parabéns por ter entrado na equipe @Danilo Vieira',
    publishedAt: new Date('2023-06-27 09:11:00')
  }
]

function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post 
                key={post.id}
                author = {post.author}
                content = {post.content}
                publishedAt = {post.publishedAt}
              />
            )
          })}
        </main>
      </div>

    </div>
  )
}

export default App

