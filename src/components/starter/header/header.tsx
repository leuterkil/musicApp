import { component$ } from "@builder.io/qwik";
import styles from "./header.module.css";
import Logo from '~/media/logo2.png?jsx'

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <Logo style={{height:'50px', width:'143px'}}  />
          </a>
        </div>
       
      </div>
    </header>
  );
});
