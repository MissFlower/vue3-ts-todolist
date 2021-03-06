# Vue 3 + Typescript + Vite + Ant-design-vue + Windicss

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## TodoList 效果图

### All

![image](public/all.png)

### Active

![image](public/active.png)

### Completed

![image](public/completed.png)

### Clear

![image](public/clear.png)

### Drag

![image](public/drag.png)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Install and use

- Get the project code

```
git clone https://github.com/MissFlower/vue3-ts-todolist.git
```

- Installation dependencies

```
cd vue3-ts-todolist
pnpm i
```

- run

```
pnpm dev
```

- build

```
pnpm build
```

- preview

```
pnpm preview
```
