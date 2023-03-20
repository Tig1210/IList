import styles from './PostInfo.module.css'
import Close from '../../images/close.png'
import Trash from '../../images/trash-can.png'
import Plus from '../../images/plus.png'

import { IComment, IPost } from '../../App'

interface IMyProps {
  activePost: IPost | undefined
  comments: Array<IComment>
  setComments: (value: Array<IComment>) => void
  setOpenPost: (value: boolean) => void
  setActivePost: (value: IPost | undefined) => void
}

export default function PostInfo({
  activePost,
  setOpenPost,
  setActivePost,
  comments,
  setComments,
}: IMyProps) {
  console.log(activePost)
  return (
    <div className={styles.content}>
      <div
        className={styles.close}
        onClick={() => {
          setActivePost(undefined)
          setOpenPost(false)
        }}
      >
        <img src={Close} />
      </div>
      <div className={styles.block}>
        <div className={styles.image}>
          <img src={activePost?.image} />
        </div>
        <div className={styles.comments}>
          <div className={styles.postInf}>
            <h2>{activePost?.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={activePost?.avatar} />
              <p>{activePost?.user}</p>
            </div>
          </div>
          <div className={styles.add}>
            <img src={Plus} />
          </div>
          <div className={styles.comList}>
            <div className={styles.list}>
              {comments
                .filter((comment) => comment.idPost === activePost?.id)
                .map((comment) => (
                  <div className={styles.comCard}>
                    <div className={styles.blockCom}>
                      <div className={styles.user}>
                        <img src={comment.avatar} />
                        <h2>{comment.user}</h2>
                      </div>
                      <div className={styles.trash}>
                        <img src={Trash} />
                      </div>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
