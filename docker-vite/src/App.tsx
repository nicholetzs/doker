import { useEffect, useState } from "react";

function App() {
  const [mensagens, setMensagens] = useState<{ message: string }[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/mensagens")
      .then((res) => res.json())
      .then(setMensagens);
  }, []);

  const enviar = async () => {
    const res = await fetch("/api/mensagens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });
    const nova = await res.json();
    setMensagens([...mensagens, nova]);
    setMsg("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Mensagens</h1>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className="border p-1 mr-2"
      />
      <button onClick={enviar} className="bg-blue-500 text-white px-3 py-1">
        Enviar
      </button>
      <ul className="mt-4">
        {mensagens.map((m, i) => (
          <li key={i}>{m.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
