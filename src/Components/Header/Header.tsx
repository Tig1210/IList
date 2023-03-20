import styles from './Header.module.css'
import { IComment, IUser } from '../../App'
import { IPost } from '../../App'
import { useState } from 'react'
import Close from '../../images/close.png'
import LogOut from '../../images/logout.png'
import UserInfo from '../UserInfo/UserInfo'

interface IMyProps {
  list: Array<IUser>
  activeUser: IUser | undefined
  clikedUser: IUser | undefined
  openPost: boolean
  openInfo: boolean
  activePost: IPost | undefined
  posts: Array<IPost>
  comments: Array<IComment>
  setComments: (value: Array<IComment>) => void
  setOpenInfo: (value: boolean) => void
  setOpenPost: (value: boolean) => void
  setOpenModal: (value: boolean) => void
  setActiveUser: (value: IUser | undefined) => void
  setClikedUser: (value: IUser | undefined) => void
  setActivePost: (value: IPost | undefined) => void
  setPosts: (value: Array<IPost>) => void
}

export default function Header({
  list,
  setOpenModal,
  activeUser,
  setActiveUser,
  clikedUser,
  setClikedUser,
  openPost,
  setOpenPost,
  openInfo,
  setOpenInfo,
  setActivePost,
  activePost,
  posts,
  setPosts,
  comments,
  setComments,
}: IMyProps) {
  const [openLog, setOpenLog] = useState<boolean>(false)
  const [checkName, setCheckName] = useState<string>()
  return (
    <div className={styles.main}>
      <h2>IList</h2>
      <div>
        <h3>Всего пользователей:{list.length}</h3>
      </div>
      {activeUser === undefined ? (
        <div style={{ display: 'flex' }}>
          <p onClick={() => setOpenModal(true)}>SIGN ON</p>
          <p onClick={() => setOpenLog(true)}>LOG IN</p>
        </div>
      ) : (
        <div className={styles.profile}>
          <div
            className={styles.profile__i}
            onClick={() => {
              setClikedUser(activeUser)
              setOpenInfo(true)
            }}
          >
            <img src={activeUser?.avatar} className={styles.av} />
            <p>{activeUser.name}</p>
          </div>
          <img
            src={LogOut}
            onClick={() => setActiveUser(undefined)}
            className={styles.exit}
          />
        </div>
      )}
      {openInfo && (
        <div className={styles.modalI}>
          <UserInfo
            setOpenInfo={setOpenInfo}
            clikedUser={activeUser}
            setClikedUser={setClikedUser}
            setPosts={setPosts}
            posts={posts}
            activePost={activePost}
            setActivePost={setActivePost}
            openPost={openPost}
            setOpenPost={setOpenPost}
            activeUser={activeUser}
            comments={comments}
            setComments={setComments}
          />
        </div>
      )}

      {openLog && (
        <div className={styles.modal}>
          <div className={styles.content}>
            <div className={styles.close} onClick={() => setOpenLog(false)}>
              <img src={Close} />
            </div>
            <div className={styles.inps}>
              <h3>Вход</h3>
              <div>
                <label>Name</label>
                <input onChange={(e) => setCheckName(e.target.value)} />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  for (let i = 0; i < list.length; i++) {
                    if (list[i].name === checkName) {
                      setActiveUser(list[i])
                    }
                  }
                  setOpenLog(false)
                }}
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
