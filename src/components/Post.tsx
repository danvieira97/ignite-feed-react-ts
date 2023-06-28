import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import Avatar from './Avatar'
import Comment from './Comment'
import styles from './Post.module.css'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
    githubLink: string;
    githubUser: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: string;
}

export default function Post({ author, publishedAt, content }: PostProps){
    const [comments, setComments] = useState(Array<string>);

    const [newComment, setNewComment] = useState('');

    const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newComment]);
        setNewComment('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewComment(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Este campo é obrigatório');
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete
        });

        setComments(commentsWithoutDeleteOne);
    }

    const isNewCommentEmpty = newComment.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                <p>{content}</p>
                <p><a href={author.githubLink} target="_blank">{author.githubUser} on github</a></p>
                <p><a href="">#neverstoplearning #workhard</a></p>
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe o seu feedback</strong>

                <textarea 
                    name='comment'
                    placeholder='Deixe um comentário'
                    onChange={handleNewCommentChange}
                    value={newComment}
                    required
                    onInvalid={handleNewCommentInvalid}
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>

                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}