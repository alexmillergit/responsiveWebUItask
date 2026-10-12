import { ChevronRightIcon } from '../icons/icons';
import { Typography } from '../ui/Typography';
import styles from './HiringBadge.module.css';

type HiringBadgeProps = {
  href?: string;
};

/** "We're hiring" announcement pill linking to the careers page. */
export function HiringBadge({ href = '#careers' }: HiringBadgeProps) {
  return (
    <a className={styles.badge} href={href}>
      <Typography as="span" variant="caption" className={styles.tag}>
        We’re hiring
      </Typography>
      <Typography as="span" variant="bodyMedium" className={styles.label}>
        Visit our careers page
      </Typography>
      <ChevronRightIcon className={styles.chevron} />
    </a>
  );
}
