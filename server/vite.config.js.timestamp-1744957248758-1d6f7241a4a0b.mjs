// vite.config.js
import { defineConfig } from "file:///Users/srishtiinnovative/Projects/Open-Source-Collab/server/node_modules/vite/dist/node/index.js";
import { VitePluginNode } from "file:///Users/srishtiinnovative/Projects/Open-Source-Collab/server/node_modules/vite-plugin-node/dist/index.js";
var vite_config_default = defineConfig({
  // ...vite configures
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: 3e3
  },
  plugins: [
    ...VitePluginNode({
      // Nodejs native Request adapter
      // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
      // you can also pass a function if you are using other frameworks, see Custom Adapter section
      adapter: "express",
      // tell the plugin where is your project entry
      appPath: "./app.js",
      // Optional, default: 'viteNodeApp'
      // the name of named export of you app from the appPath file
      exportName: "app",
      // Optional, default: false
      // if you want to init your app on boot, set this to true
      initAppOnBoot: true,
      // Optional, default: 'esbuild'
      // The TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
      // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
      tsCompiler: "esbuild",
      // Optional, default: {
      // jsc: {
      //   target: 'es2019',
      //   parser: {
      //     syntax: 'typescript',
      //     decorators: true
      //   },
      //  transform: {
      //     legacyDecorator: true,
      //     decoratorMetadata: true
      //   }
      // }
      // }
      // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
      swcOptions: {}
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3Jpc2h0aWlubm92YXRpdmUvUHJvamVjdHMvT3Blbi1Tb3VyY2UtQ29sbGFiL3NlcnZlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NyaXNodGlpbm5vdmF0aXZlL1Byb2plY3RzL09wZW4tU291cmNlLUNvbGxhYi9zZXJ2ZXIvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NyaXNodGlpbm5vdmF0aXZlL1Byb2plY3RzL09wZW4tU291cmNlLUNvbGxhYi9zZXJ2ZXIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgVml0ZVBsdWdpbk5vZGUgfSBmcm9tIFwidml0ZS1wbHVnaW4tbm9kZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyAuLi52aXRlIGNvbmZpZ3VyZXNcbiAgc2VydmVyOiB7XG4gICAgLy8gdml0ZSBzZXJ2ZXIgY29uZmlncywgZm9yIGRldGFpbHMgc2VlIFt2aXRlIGRvY10oaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy8jc2VydmVyLWhvc3QpXG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIC4uLlZpdGVQbHVnaW5Ob2RlKHtcbiAgICAgIC8vIE5vZGVqcyBuYXRpdmUgUmVxdWVzdCBhZGFwdGVyXG4gICAgICAvLyBjdXJyZW50bHkgdGhpcyBwbHVnaW4gc3VwcG9ydCAnZXhwcmVzcycsICduZXN0JywgJ2tvYScgYW5kICdmYXN0aWZ5JyBvdXQgb2YgYm94LFxuICAgICAgLy8geW91IGNhbiBhbHNvIHBhc3MgYSBmdW5jdGlvbiBpZiB5b3UgYXJlIHVzaW5nIG90aGVyIGZyYW1ld29ya3MsIHNlZSBDdXN0b20gQWRhcHRlciBzZWN0aW9uXG4gICAgICBhZGFwdGVyOiBcImV4cHJlc3NcIixcblxuICAgICAgLy8gdGVsbCB0aGUgcGx1Z2luIHdoZXJlIGlzIHlvdXIgcHJvamVjdCBlbnRyeVxuICAgICAgYXBwUGF0aDogXCIuL2FwcC5qc1wiLFxuXG4gICAgICAvLyBPcHRpb25hbCwgZGVmYXVsdDogJ3ZpdGVOb2RlQXBwJ1xuICAgICAgLy8gdGhlIG5hbWUgb2YgbmFtZWQgZXhwb3J0IG9mIHlvdSBhcHAgZnJvbSB0aGUgYXBwUGF0aCBmaWxlXG4gICAgICBleHBvcnROYW1lOiBcImFwcFwiLFxuXG4gICAgICAvLyBPcHRpb25hbCwgZGVmYXVsdDogZmFsc2VcbiAgICAgIC8vIGlmIHlvdSB3YW50IHRvIGluaXQgeW91ciBhcHAgb24gYm9vdCwgc2V0IHRoaXMgdG8gdHJ1ZVxuICAgICAgaW5pdEFwcE9uQm9vdDogdHJ1ZSxcblxuICAgICAgLy8gT3B0aW9uYWwsIGRlZmF1bHQ6ICdlc2J1aWxkJ1xuICAgICAgLy8gVGhlIFR5cGVTY3JpcHQgY29tcGlsZXIgeW91IHdhbnQgdG8gdXNlXG4gICAgICAvLyBieSBkZWZhdWx0IHRoaXMgcGx1Z2luIGlzIHVzaW5nIHZpdGUgZGVmYXVsdCB0cyBjb21waWxlciB3aGljaCBpcyBlc2J1aWxkXG4gICAgICAvLyAnc3djJyBjb21waWxlciBpcyBzdXBwb3J0ZWQgdG8gdXNlIGFzIHdlbGwgZm9yIGZyYW1ld29ya3NcbiAgICAgIC8vIGxpa2UgTmVzdGpzIChlc2J1aWxkIGRvbnQgc3VwcG9ydCAnZW1pdERlY29yYXRvck1ldGFkYXRhJyB5ZXQpXG4gICAgICAvLyB5b3UgbmVlZCB0byBJTlNUQUxMIGBAc3djL2NvcmVgIGFzIGRldiBkZXBlbmRlbmN5IGlmIHlvdSB3YW50IHRvIHVzZSBzd2NcbiAgICAgIHRzQ29tcGlsZXI6IFwiZXNidWlsZFwiLFxuXG4gICAgICAvLyBPcHRpb25hbCwgZGVmYXVsdDoge1xuICAgICAgLy8ganNjOiB7XG4gICAgICAvLyAgIHRhcmdldDogJ2VzMjAxOScsXG4gICAgICAvLyAgIHBhcnNlcjoge1xuICAgICAgLy8gICAgIHN5bnRheDogJ3R5cGVzY3JpcHQnLFxuICAgICAgLy8gICAgIGRlY29yYXRvcnM6IHRydWVcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICB0cmFuc2Zvcm06IHtcbiAgICAgIC8vICAgICBsZWdhY3lEZWNvcmF0b3I6IHRydWUsXG4gICAgICAvLyAgICAgZGVjb3JhdG9yTWV0YWRhdGE6IHRydWVcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfVxuICAgICAgLy8gfVxuICAgICAgLy8gc3djIGNvbmZpZ3MsIHNlZSBbc3djIGRvY10oaHR0cHM6Ly9zd2MucnMvZG9jcy9jb25maWd1cmF0aW9uL3N3Y3JjKVxuICAgICAgc3djT3B0aW9uczoge30sXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVcsU0FBUyxvQkFBb0I7QUFDaFksU0FBUyxzQkFBc0I7QUFFL0IsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixRQUFRO0FBQUE7QUFBQSxJQUVOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxHQUFHLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUloQixTQUFTO0FBQUE7QUFBQSxNQUdULFNBQVM7QUFBQTtBQUFBO0FBQUEsTUFJVCxZQUFZO0FBQUE7QUFBQTtBQUFBLE1BSVosZUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BUWYsWUFBWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWdCWixZQUFZLENBQUM7QUFBQSxJQUNmLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
