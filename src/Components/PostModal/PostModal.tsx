import { useState } from 'react'
import styles from './PostModal.module.css'
import Close from '../../images/close.png'

import { IPost } from '../../App'
import { IUser } from '../../App'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase'

interface IMyProps {
  setAddPostModal: (value: boolean) => void
  clikedUser: IUser | undefined
  posts: Array<IPost>
  setPosts: (value: Array<IPost>) => void
}

export default function PostModal({
  setAddPostModal,
  posts,
  clikedUser,
  setPosts,
}: IMyProps) {
  const [titleP, setTitle] = useState<string>()
  const [imageP, setImage] = useState<string>()
  return (
    <div className={styles.container}>
      <div
        className={styles.close}
        onClick={() => {
          setAddPostModal(false)
        }}
      >
        <img src={Close} />
      </div>
      <div className={styles.inps}>
        <h3>Добавить пост</h3>
        <div>
          <label>Title</label>
          <input onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Image</label>
          <input onChange={(e) => setImage(e.target.value)} />
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault()
            let post = {
              id: posts.length + 1,
              title: titleP,
              user: clikedUser?.name,
              userId: clikedUser?.id,
              image: imageP,
              avatar: clikedUser?.avatar,
            }
            try {
              const docRef = await addDoc(collection(db, 'posts'), post)
              console.log('Document written with ID: ', docRef.id)
            } catch (e) {
              console.error('Error adding document: ', e)
            }
            setPosts([...posts, post])
            setAddPostModal(false)
          }}
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
