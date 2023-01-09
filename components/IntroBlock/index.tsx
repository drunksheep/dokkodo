import styles from './style.module.scss';

export default function IntroBlock() {
    return (
        <div className="block">
            <h1 className={styles.mainTitle}>Dokkōdō</h1>
            <img src="/images/yojimbo.jpg" alt="Avatar do Yojimbo" className={styles.mainLogo} />
            <blockquote className={styles.quote} cite="Yojimbo quote, by Akira Kurosawa">There's no cure for Fools</blockquote>
        </div>
    )
}
