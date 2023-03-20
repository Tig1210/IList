import { useState } from 'react'
import styles from './RegistrationForm.module.css'
import Close from '../../images/close.png'
import { IPost } from '../../App'
import { IUser } from '../../App'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase'

interface IMyProps {
  list: Array<IUser>
  setOpenModal: (value: boolean) => void
  setList: (value: Array<IUser>) => void
}

export default function RegistartionForm({
  list,
  setOpenModal,
  setList,
}: IMyProps) {
  const [name, setName] = useState<string>('')
  const [avatar, setAvatar] = useState<string>(
    'https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-black-2/21/07-1024.png'
  )
  return (
    <div className={styles.content}>
      <div className={styles.close} onClick={() => setOpenModal(false)}>
        <img src={Close} />
      </div>
      <div className={styles.inps}>
        <h3>Регистрация</h3>
        <div>
          <label>Name</label>
          <input onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Avatar</label>
          <input onChange={(e) => setAvatar(e.target.value)} />
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault()
            let user = {
              id: list.length + 1,
              name: name,
              avatar: avatar,
            }
            try {
              await addDoc(collection(db, 'users'), {
                user,
              })
            } catch (e) {
              console.error('Error adding document: ', e)
            }

            setList([...list, user])
            setOpenModal(false)
          }}
        >
          Зарегестрироваться
        </button>
      </div>
    </div>
  )
}
