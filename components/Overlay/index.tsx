import styles from './style.module.scss';

export default function Overlay() {
    return (
        <div className={styles.ajaxOverlay}>
            <div className={styles.loadingioSpinnerEclipse}>
                <div className={styles.ldio}>
                    <div />
                </div>
            </div>
        </div>
    )
}
