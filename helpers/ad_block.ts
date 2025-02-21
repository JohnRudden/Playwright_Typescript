export default async function adBlock(context: any):Promise<any> {
await context.route("**/*", (request: any) => {
  request.request().url().startsWith("https://pagead2.googlesyndication")
     ? request.abort()
    : request.continue();
   return;
 })
};