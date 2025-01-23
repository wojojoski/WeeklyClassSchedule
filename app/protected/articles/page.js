"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("../public/user/signin");
  //   }
  // }, [user, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!user) return;

      try {
        const articlesRef = collection(db, "articles");
        const userRef = doc(db, "users", user.uid);
        const q = query(articlesRef, where("user", "==", userRef));
        const querySnapshot = await getDocs(q);

        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles: ", error);
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Articles</h1>
      {loading && <p>Loading articles...</p>}
      {error && (
        <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
          {error}
        </div>
      )}
      {!loading && !error && articles.length === 0 && (
        <p>No articles found. Create your first article!</p>
      )}
      <ul>
        {articles.map((article) => (
          <li
            key={article.id}
            className="mb-4 p-4 border border-gray-300 rounded shadow"
          >
            <h2 className="text-lg font-bold">{article.title}</h2>
            <p className="text-gray-600">{article.content}</p>
            <p className="text-sm text-gray-500">
              Created at: {new Date(article.date.toDate()).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
