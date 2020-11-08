declare module '*.vue' {
  import type { Component, DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, Component>;
  export default component;
}
