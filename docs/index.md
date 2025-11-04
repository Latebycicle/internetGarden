---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<br><br><br>
<Oneko />

<!-- Bangalore Skill Summit Welcome Section -->
<div class="skill-summit-welcome">
  <h2>Welcome, Bangalore Skill Summit Attendee!</h2>
  <p>Hi! Great to meet you at the Bangalore Skill Summit. Here are a few quick links to connect:</p>
  
  <div class="summit-actions">
    <a href="/AkhilResume.pdf" target="_blank" class="summit-btn primary">
      📄 View My Resume
    </a>
    <a href="https://www.linkedin.com/in/akhil-ramchand/" target="_blank" class="summit-btn brand">
      💼 Connect on LinkedIn
    </a>
    <a href="https://github.com/Latebycicle/" target="_blank" class="summit-btn brand">
      💻 See My Work on GitHub
    </a>
    <ShareButton />
  </div>
</div>

<div class="divider"></div>

I'm **Akhil Ramchand**, A Computer Science & Engineering Student based in Bangalore. 

I've specialised in **AI/ML**, and I'm minoring in **psychology**, which gives me a unique perspective that enables me to create and deploy solutions where technology meets people.


I believe in making **simple**, **efficient** and **elegant** software solutions to bring meaningful change to the world. 
<br><br><br>

### My Recent work
<br>


<div class="cards-container">
<a href="../Metacognition">
  <card 
      image="/metacog.png" 
      title="Metacognition: The basis of good AI Interaction" 
      description="This article explores metacognition as the foundation of effective AI interaction, emphasizing self-awareness, prompt engineering, critical evaluation, and workflow adaptation for optimal collaboration with generative AI systems."
    /></a>

<a href="../artofvisualstorytelling">
  <card 
    image="/artofvisualstorytellingposter.png" 
    title="The Art of Visual Storytelling" 
    description="What I learnt as an experienced graphic designer from a poster design workshop at BIC"
  /> </a>
</div>

<style>
  a {
  text-decoration: none !important; /* no underline */
}

/* Bangalore Skill Summit Welcome Section Styles */
.skill-summit-welcome {
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-brand-softer) 100%);
  border: 2px solid var(--vp-c-brand-light);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0 3rem 0;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.skill-summit-welcome h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--vp-c-brand-dark);
}

.skill-summit-welcome p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.summit-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.summit-btn {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summit-btn.primary {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  border: 2px solid var(--vp-c-brand-1);
}

.summit-btn.primary:hover {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.summit-btn.brand {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
}

.summit-btn.brand:hover {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--vp-c-divider), transparent);
  margin: 3rem 0;
}

@media (min-width: 640px) {
  .summit-actions {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
  }
  
  .summit-btn {
    flex: 0 1 auto;
    min-width: 200px;
  }
}
</style>

