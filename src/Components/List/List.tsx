import styles from './List.module.css'
import { useState, useEffect } from 'react'
import RegistartionForm from '../RegistrationForm/RegistrationForm'
import UserInfo from '../UserInfo/UserInfo'
import Users from '../../images/group.png'
import Posts from '../../images/post.png'
import { IComment, IPost } from '../../App'
import { IUser } from '../../App'
import PostInfo from '../PostInfo/PostInfo'

interface IMyProps {
  list: Array<IUser>
  posts: Array<IPost>
  openModal: boolean
  activePost: IPost | undefined
  clikedUser: IUser | undefined
  openPost: boolean
  openInfo: boolean
  activeUser: IUser | undefined
  comments: Array<IComment>
  setComments: (value: Array<IComment>) => void
  setOpenInfo: (value: boolean) => void
  setOpenPost: (value: boolean) => void
  setActivePost: (value: IPost | undefined) => void
  setList: (value: Array<IUser>) => void
  setPosts: (value: Array<IPost>) => void
  setOpenModal: (value: boolean) => void
  setClikedUser: (value: IUser | undefined) => void
}

export default function List({
  list,
  setList,
  setPosts,
  posts,
  openModal,
  setOpenModal,
  activePost,
  setActivePost,
  setClikedUser,
  clikedUser,
  openPost,
  setOpenPost,
  setOpenInfo,
  openInfo,
  activeUser,
  comments,
  setComments,
}: IMyProps) {
  const [activePage, setActivePage] = useState<boolean>(true)
  return (
    <>
      <div className={styles.main}>
        {openModal && (
          <div className={styles.modal}>
            <RegistartionForm
              setOpenModal={setOpenModal}
              list={list}
              setList={setList}
            />
          </div>
        )}
        <div className={styles.nav}>
          <div className={styles.nav__bl}>
            <img src={Users} onClick={() => setActivePage(true)} />
            <img src={Posts} onClick={() => setActivePage(false)} />
          </div>
        </div>
        <div>
          {activePage === true ? (
            <div className={styles.list}>
              {list.map((user) => (
                <div
                  className={styles.card}
                  onClick={() => {
                    setClikedUser(user)
                    setOpenInfo(true)
                  }}
                >
                  <img src={user.avatar} alt={user.name} />
                  <h2>{user.name}</h2>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.listP}>
              {posts.map((post) => (
                <div
                  className={styles.post}
                  onClick={() => {
                    setActivePost(post)
                    setOpenPost(true)
                  }}
                >
                  <img src={post?.image} />
                </div>
              ))}
            </div>
          )}
          {openPost && (
            <div className={styles.modalP}>
              <PostInfo
                activePost={activePost}
                setOpenPost={setOpenPost}
                setActivePost={setActivePost}
                comments={comments}
                setComments={setComments}
              />
            </div>
          )}
        </div>
        {openInfo && (
          <div className={styles.modal}>
            <UserInfo
              setOpenInfo={setOpenInfo}
              clikedUser={clikedUser}
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
      </div>
    </>
  )
}
