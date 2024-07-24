"use client";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'How can I help you learn more about Ben Grob and his resume?'
    }
  ]);

  const submitForm = async (e) => {
    e.preventDefault();
    let newMessages = [...messages, { role: 'user', content: messageInput }];
    setMessages(newMessages);
    setMessageInput('');

    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: newMessages })
        });
        const apiMessage = await response.json();

        if (!response.ok) {
            throw new Error(apiMessage.details || 'Unknown error occurred');
        }

        setMessages([...newMessages, { role: 'assistant', content: apiMessage.message }]);
    } catch (error) {
        console.error('Error fetching from API:', error);
        setMessages([...newMessages, { role: 'system', content: 'There was an error processing your request. Please try again later.' }]);
    }
};


  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return ( 
    <>
    <header id="header">
      <a href="#" className="logo-holder">
        <div className="logo">L</div>
        <div className="logo-text">Portfolio Website</div>
      </a>
      <nav>
        <ul id="menu" className={menuOpen ? "active" : ""}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="mailto:ben.grob@grobis.ch" className="button">Contact Me</a>
          </li>
        </ul>
        <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M5 7h14M5 12h14M5 17h10"
            />
          </svg>
        </a>
      </nav>
    </header>
    <main>
      <section className="hero container">
        <div className="hero-blue">
          <div>
            <h1>
              <small>Hi I'm</small>
              Ben Grob
            </h1>
            <p>
              I am an aspiring computer scientist with three years of practical
              experience in software development and IT technologies. My
              education at the Informatikmittelschule (IMS) Frauenfeld provided
              me with a solid foundation in programming, databases, and web
              development. 
              <span>During my time at IMS Frauenfeld, I had the opportunity to
                apply and deepen my theoretical knowledge in various projects. I
                am motivated to further develop my skills and am now seeking a
                challenging position where I can fully realize and expand my
                potential.</span>
              Although I have not yet held a professional position
              in the field of computer science, I have gained valuable practical
              experience through numerous projects and internships.
            </p>
            <div className="call-to-action">
              <a href="./Lebenslauf.pdf" target="_blank" className="button black"> View Resume </a>
              <a href="mailto:ben.grob@grobis.ch" className="button white"> Contact Me </a>
            </div>
            <div className="social-links">
              <a href="#">
                <img src="imgs/github.png" alt="GitHub" width="48" />
              </a>
              <a href="#">
                <img
                  src="imgs/iconmonstr-linkedin-3.svg"
                  alt="LinkedIn"
                  width="48"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-yellow">
          <img src="imgs/hero-image.png" alt="Ben Grob" width="100%" />
        </div>
      </section>
      <section className="logos container">
        <div className="marquee">
          <div className="track">
            <img src="imgs/html.png" alt="HTML" width="128" />
            <img src="imgs/css.png" alt="CSS" width="128" />
            <img src="imgs/javascript.png" alt="JS" width="128" />
            <img src="imgs/react.png" alt="React" width="128" />
            <img src="imgs/azure.png" alt="Azure" width="128" />
            <img src="imgs/vscode.png" alt="VS Code" width="128" />
            <img src="imgs/c-sharp.png" alt="C#" width="128" />

            <img src="imgs/html.png" alt="HTML" width="128" />
            <img src="imgs/css.png" alt="CSS" width="128" />
            <img src="imgs/javascript.png" alt="JS" width="128" />
            <img src="imgs/react.png" alt="React" width="128" />
            <img src="imgs/azure.png" alt="Azure" width="128" />
            <img src="imgs/vscode.png" alt="VS Code" width="128" />
            <img src="imgs/c-sharp.png" alt="C#" width="128" />

            <img src="imgs/html.png" alt="HTML" width="128" />
            <img src="imgs/css.png" alt="CSS" width="128" />
            <img src="imgs/javascript.png" alt="JS" width="128" />
            <img src="imgs/react.png" alt="React" width="128" />
            <img src="imgs/azure.png" alt="Azure" width="128" />
            <img src="imgs/vscode.png" alt="VS Code" width="128" />
            <img src="imgs/c-sharp.png" alt="C#" width="128" />
          </div>
        </div>
      </section>
      <section id="skills" className="skills container">
        <h2>
          <small>About Me</small>
          Skills
        </h2>
        <div className="holder-blue">
          <div className="left-column">
            <h3>Frontend</h3>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>Javascript</li>
              <li>React</li>
            </ul>
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>CSS</li>
              <li>Java</li>
            </ul>
          </div>
          <div className="right-column">
            <h3>A bit about me</h3>
            <p>Hi I'm Ben...</p>
          </div>
        </div>
      </section>
      <section className="work-experience container">
        <h2>
            <small>Recent</small>
            Work Experience
        </h2>
        <div className="jobs">
            <article>
                <figure>
                    <div>
                        <img src="imgs/bernegg.png" alt="workplace-1" width="100%"/>
                        <figcaption>
                            workplace-1
                        </figcaption>
                    </div>
                </figure>
                <h3>Workplace - 1</h3>
                <div>2000 - 2000</div>
                <p>Description</p>
            </article>
            <article>
              <figure>
                  <div>
                      <img src="imgs/egelsee.jpg" alt="workplace-1" width="100%"/>
                      <figcaption>
                          workplace-1
                      </figcaption>
                  </div>
              </figure>
              <h3>Workplace - 1</h3>
              <div>2000 - 2000</div>
              <p>Description</p>
          </article>
        </div>
      </section>
      <section id="projects" className="bento container">
        <h2>
          <small>
            Previous
          </small>
          Completed Projects
        </h2>
        <div className="bento-grid">
          <a href="#" className="bento-item">
            <img src="" alt="1"/>
          </a>
          <a href="#" className="bento-item">
            <img src="" alt="2"/>
          </a>
          <a href="#" className="bento-item">
            <img src="" alt="3"/>
          </a>
          <a className="bento-item">
            <img src="" alt="4"/>
          </a>
          <a href="#" className="bento-item">
            <img src="" alt="5"/>
          </a>
          <a href="#" className="bento-item">
            <img src="" alt="6"/>
          </a>
        </div>
      </section>
      <section className="chatbot container">
        <h2>
          <small>
            Talk to me
          </small>
          Chatbot
        </h2>
        <div className="chatbot-blue">
          <div className="chat-info">
            <h3>Azure AI Chatbot</h3>
            <p>I've put together a chatbot
            here which know all my skills,
            work experience and has a copy
            of my CV/resume. You can use it to
            ask questions about me to get 
            a better idea of who I am and 
            what I've done.
            </p>
            <p>You can also download my
              resume here if you want to take
              a look at it. I'm currently 
              loking for new oppertunities so 
              if you have a project you think
              I'd might be good fit for, please
              get in touch!
            </p>
            <a href="./Lebenslauf.pdf" className="button black">Download Resume</a>
          </div>
          <div className="chat-box">
            <div className="scroll-area">
              <ul id="chat-log">
              {messages.map((message, index) => (
                <li key={index} className={`${message.role}`}>
                  <span className={`avatar`}>
                    {message.role === 'user' ? 'You' : 'AI'}
                  </span>
                  <div className="message">{message.content}</div>
                </li>
              ))}
              </ul>
            </div>
            <form onSubmit={submitForm} className="chat-message">
              <input type="text" placeholder="Hey Ben, what skills are you best at?" value={messageInput} onChange={e => setMessageInput(e.target.value)}/>
               <button className="button black">Send</button>
            </form>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
