import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "~/routes/layout";
import styles from "./footer.module.css";
import useDate from "~/hooks/dateHook";

export default component$(() => {
  const serverTime = useServerTimeLoader();
  const formatedDate = useDate(new Date(serverTime.value.date),"dd/MM/yyyy")

  return (
    <footer>
      <div class="container">
        <a href="https://echarissopoulos.cf/" target="_blank" class={styles.anchor}>
          <span>Made with ❤ by Left4Dev</span>
          <span class={styles.spacer}>|</span>
          <span>{formatedDate}</span>
        </a>
      </div>
    </footer>
  );
});
