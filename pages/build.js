import Layout from '../components/Layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function BuildPage() {
  const router = useRouter()
  useEffect(() => { router.replace('/build.html') }, [])
  return <Layout title="构筑模拟器"><div className="page-header"><h1>⚔️ 跳转中...</h1></div></Layout>
}
