import { useState, useEffect } from 'react'
import Header from './Components/Header/Header'
import List from './Components/List/List'

import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export interface IPost {
  id: number
  title: string | undefined
  user: string | undefined
  userId: number | undefined
  image?: string | undefined
  avatar?: string | undefined
}

export interface IUser {
  id: number
  name: string
  avatar?: string
  status?: string
}

export interface IComment {
  id: number
  idPost: number
  text: string
  idUser: number
  user: string
  avatar?: string
}

function App(this: IUser) {
  const [activeUser, setActiveUser] = useState<IUser>()
  const [activePost, setActivePost] = useState<IPost | undefined>(undefined)
  const [clikedUser, setClikedUser] = useState<IUser | undefined>(undefined)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [openPost, setOpenPost] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [list, setList] = useState<IUser[]>([])
  const [posts, setPosts] = useState<IPost[]>([])
  const [comments, setComments] = useState<IComment[]>([])
  useEffect(() => {
    ;(async () => {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const d = querySnapshot.docs.map((doc) => {
        return doc.data() as IUser
      })
      setList(d)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'))
      const d = querySnapshot.docs.map((doc) => {
        return doc.data() as IPost
      })
      setPosts(d)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const querySnapshot = await getDocs(collection(db, 'comments'))
      const d = querySnapshot.docs.map((doc) => {
        return doc.data() as IComment
      })
      setComments(d)
    })()
  }, [])

  return (
    <div className="App">
      <Header
        list={list}
        setOpenModal={setOpenModal}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
        clikedUser={clikedUser}
        setClikedUser={setClikedUser}
        openPost={openPost}
        setOpenPost={setOpenPost}
        openInfo={openInfo}
        setOpenInfo={setOpenInfo}
        setPosts={setPosts}
        posts={posts}
        activePost={activePost}
        setActivePost={setActivePost}
        comments={comments}
        setComments={setComments}
      />
      <List
        list={list}
        setList={setList}
        posts={posts}
        setPosts={setPosts}
        openModal={openModal}
        setOpenModal={setOpenModal}
        activePost={activePost}
        setActivePost={setActivePost}
        clikedUser={clikedUser}
        setClikedUser={setClikedUser}
        openPost={openPost}
        setOpenPost={setOpenPost}
        openInfo={openInfo}
        setOpenInfo={setOpenInfo}
        activeUser={activeUser}
        comments={comments}
        setComments={setComments}
      />
    </div>
  )
}

export default App
