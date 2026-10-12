import illustration from '../../assets/hero-illustration.png';
import { Typography } from '../ui/Typography';
import { HiringBadge } from './HiringBadge';
import { TrialForm } from './TrialForm';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <HiringBadge />

          <Typography as="h1" variant="display" id="hero-title" className={styles.title}>
            <span className={styles.line}>A better way to</span>
            <span className={`${styles.line} ${styles.accent}`}>ship web apps</span>
          </Typography>

          <Typography variant="lead" tone="muted" className={styles.lead}>
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat
            commodo. Elit sunt amet fugiat veniam occaecat fugiat.
          </Typography>

          <TrialForm />
        </div>

        <div className={styles.visual} aria-hidden="true">
          <img
            className={styles.illustration}
            src={illustration}
            alt=""
            width={626}
            height={624}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
