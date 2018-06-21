export const isLoggedIn = async (resolve: any, parent: any, args: any, ctx: any, info: any) => {
  // Include your agent code as Authorization: <token> header.
  // const permit = ctx.request.get('Authorization') === code

  // if (!permit) {
  //   throw new Error(`Not authorised!`)
  // }
  console.log(parent, args, ctx, info)
  console.log(ctx.request.get('Authorization'))
  return resolve()
}