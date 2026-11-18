export async function getUser() {
    const respueta = await fetch(`${process.env.NEXT_PUBLIC_SERVIDOR_BACKEND}/auth/me`)
    if (!respueta.ok) throw new Error('ocurrio un error al traer los usuarios');
    const resJson = respueta.json();
}