export default function LoginPage() {
  return (
    <section className="mx-auto max-w-sm rounded-2xl border bg-white p-6">
      <h1 className="text-lg font-semibold">로그인</h1>

      <form className="mt-4 space-y-3">
        <input
          className="w-full rounded-xl border p-3"
          type="email"
          placeholder="이메일"
        />
        <input
          className="w-full rounded-xl border p-3"
          type="password"
          placeholder="비밀번호"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-black p-3 text-white hover:opacity-90"
        >
          로그인
        </button>
      </form>
    </section>
  )
}