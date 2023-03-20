import styles from './UserInfo.module.css'
import Close from '../../images/close.png'
import Plus from '../../images/plus.png'
import Dots from '../../images/dots.png'
import { useState } from 'react'
import PostInfo from '../PostInfo/PostInfo'
import PostModal from '../PostModal/PostModal'

import { IComment, IPost } from '../../App'
import { IUser } from '../../App'

interface IMyProps {
  activeUser: IUser | undefined
  clikedUser: IUser | undefined
  posts: Array<IPost>
  activePost: IPost | undefined
  openPost: boolean
  comments: Array<IComment>
  setComments: (value: Array<IComment>) => void
  setOpenInfo: (value: boolean) => void
  setClikedUser: (value: IUser | undefined) => void
  setOpenPost: (value: boolean) => void
  setActivePost: (value: IPost | undefined) => void
  setPosts: (value: Array<IPost>) => void
}

export default function UserInfo({
  setOpenInfo,
  setClikedUser,
  clikedUser,
  setPosts,
  posts,
  setActivePost,
  activePost,
  openPost,
  setOpenPost,
  activeUser,
  comments,
  setComments,
}: IMyProps) {
  const [addPostModal, setAddPostModal] = useState<boolean>(false)
  console.log(activeUser, clikedUser)
  console.log(posts)

  return (
    <div className={styles.content}>
      <div
        className={styles.close}
        onClick={() => {
          setClikedUser(undefined)
          setOpenInfo(false)
        }}
      >
        <img src={Close} />
      </div>
      <div className={styles.block}>
        <div className={styles.info}>
          <div className={styles.settings}>
            <img src={Dots} />
          </div>
          <div className={styles.info__main}>
            <img src={clikedUser?.avatar} />
            <h2>{clikedUser?.name}</h2>
            <p>{clikedUser?.status}</p>
          </div>
          {activeUser?.name === clikedUser?.name && (
            <div className={styles.add} onClick={() => setAddPostModal(true)}>
              <img src={Plus} />
            </div>
          )}
        </div>
        {addPostModal && (
          <div className={styles.modal}>
            <PostModal
              setAddPostModal={setAddPostModal}
              clikedUser={clikedUser}
              posts={posts}
              setPosts={setPosts}
            />
          </div>
        )}
        <div className={styles.posts__block}>
          <div className={styles.list}>
            {posts
              ?.filter((user) => user.userId === clikedUser?.id)
              .map((post) => (
                <div
                  className={styles.card}
                  onClick={() => {
                    setActivePost(post)
                    setOpenPost(true)
                  }}
                >
                  <div className={styles.img__block}>
                    <img src={post?.image} />
                  </div>
                  <p>{post?.title}</p>
                  <p>{post?.user}</p>
                  <p>{post?.userId}</p>
                </div>
              ))}
          </div>
        </div>
        {openPost && (
          <div className={styles.modal}>
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
    </div>
  )
}
