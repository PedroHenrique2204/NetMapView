const API_URL = 'http://localhost:4000';

async function create(resource, data) {
  resource = `${API_URL}/${resource}`;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(data),
  };

  const res = await fetch(resource, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro na requisição: ${res.status} - ${errorText}`);
  }

  const createdData = await res.json();

  return createdData;
}
