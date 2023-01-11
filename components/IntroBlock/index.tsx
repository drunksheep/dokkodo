import styles from './style.module.scss';
import { quoteProps } from '../../types/quoteProps';

export default function IntroBlock(props: quoteProps) {
    return (
        <div className="block">
            <h1 className={styles.mainTitle}>Dokkōdō</h1>
            <img src="/images/yojimbo.jpg" alt="Avatar do Yojimbo" className={styles.mainLogo} />
            <blockquote className={styles.quote} cite="Dokkodo quote, by Akira Kurosawa">
                {props.quote}
            </blockquote>
        </div>
    )
}
