import esbuild from 'esbuild';

esbuild.build({
        entryPoints: ['src/app.ts'],
        bundle: true,
        outdir: 'dist',
        platform: 'node',
        minify: true,
        treeShaking: true,
        sourcemap: true,
});
