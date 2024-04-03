<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>News Application with Next.js, React.js, and Tailwind</h1>

<h2>Overview</h2>
<p>This repository contains the code for a News Application built with Next.js, Node.js, and Tailwind CSS. The backend is developed using Node.js and JavaScript, while the frontend utilizes Next.js for the client side.</p>

<p>The application provides separate interfaces for normal users and admins:</p>
<ul>
  <li>Normal users can access the website at <a href="http://localhost:3000">http://localhost:3000</a> to read articles.</li>
  <li>Admins can log in to the admin panel at <a href="http://localhost:3000/admin">http://localhost:3000/admin</a> using the provided credentials.</li>
</ul>

<p>The server is running at port 5000.</p>

<h2>Features</h2>
<ul>
  <li><strong>Next.js Frontend:</strong> Provides server-side rendering and other advanced features.</li>
  <li><strong>Tailwind CSS:</strong> Utility-first CSS framework for easy styling.</li>
  <li><strong>Node.js Backend:</strong> Handles requests and manages data.</li>
  <li><strong>Admin Panel:</strong> Separate interface for admins with additional functionalities such as Image Uploading, creating, reading, updating, and deleting articles, as well as managing admins.</li>
  <li><strong>TypeScript Integration:</strong> Utilized in the client-side codebase for static typing and improved code maintainability.</li>
</ul>

<h2>Usage</h2>

<h3>Configuration</h3>
<p>Before running the application, you need to set up environment variables:</p>
<ul>
  <li><strong>PORT:</strong> Set the port number. Example: <code>PORT=5000</code></li>
  <li><strong>MONGODB_URI:</strong> Set the MongoDB URI. Example: <code>MONGODB_URI=mongodb+srv://username:password@host/database</code></li>
  <li><strong>JWT_LOGIN_TOKEN:</strong> Set the JWT login token. Example: <code>JWT_LOGIN_TOKEN=himantha1234%@#$</code></li>
</ul>

<h3>Installation</h3>
<p>Before running the application, make sure to install dependencies for both the server and the client. Navigate to the respective directories and run:</p>
<div class="code-block">
  <pre><code>cd server</code></pre>
  <pre><code>npm install</code></pre>
</div>
<div class="code-block">
  <pre><code>cd client</code></pre>
  <pre><code>npm install</code></pre>
</div>

<h3>Running the Server</h3>
<p>To start the server, run the following commands:</p>
<div class="code-block">
  <pre><code>cd server</code></pre>
  <pre><code>npm run dev</code></pre>
</div>

<h3>Running the Client</h3>
<p>To start the client, run the following commands:</p>
<div class="code-block">
  <pre><code>cd client</code></pre>
  <pre><code>npm run dev</code></pre>
</div>

<h3>Admin Credentials</h3>
<p>Use the following credentials to log in to the admin panel:</p>
<ul>
  <li><strong>Username:</strong> admin@gmail.com</li>
  <li><strong>Password:</strong> admin123</li>
</ul>

<h3>Add New Admin</h3>
<p>After logging in to the admin dashboard, navigate to the "Manage Admins" section from the sidebar to add new admins to the system.</p>

</body>
</html>
