---
outline: deep
lastUpdated: 8/5/2025
tags: [AI/ML, XAI, Psychology]
wc: 2107
title: "Metacognition: The basis of good AI Interaction"
--- 
# Metacognition: The basis of good AI Interaction
<Tags :tags="$frontmatter.tags" :wc="$frontmatter.wc" />

Generative AI is the latest tool in the average person's toolbelt, and it's the biggest step forward since Google Search, and, as with all systems and tools, there are prerequisites and skills required to make effective use of it. 

### What is metacognition?
Generative AI systems and their probabilistic outputs require *metacognative skills* - the ability to monitor and control your own thought process and behaviour. 

<img src='/metaprocessing.png'>


Nelson and Narens [<a href="#ref-1">1</a>] presented the "Metacognative Model", which distinguishes between object-level processes and meta-level cognition. Object-level processes reflect the basic cognitive work of perceiving, remembering, classifying, deciding, and so on. Meta-level processes monitor those object-level processes to assess their functioning (e.g., assessing how well one grasped the gist of a text) and allocate resources appropriately (e.g., deciding to re-read the text). 

> A manager needs to clearly understand and formulate their goals, break down those goals into communicable tasks, confidently assess the quality of the team’s output, and adjust plans accordingly along the way. Moreover, they need to decide whether, when, and how to delegate tasks in the first place. Among others, these responsibilities involve the metacognitive monitoring and control of one’s thought processes and behaviour.  [<a href="#ref-2">2</a>]


#### Why do you need metacognitive skills?

AI is being integrated into more and more systems and processes (eg, Web design - Figma AI, Writing - ChatGPT, Coding - Github Copilot, etc.) by the day. This transformation from classic tool-based systems that humans work with to integrated LLMs is not a simplification of human cognitive work, but instead, it's a shift in people's focus towards higher-order thinking skills that are more important when collaborating & interacting with AI agents. 

<img src='/stages.png'>

There are 3 main stages of interaction with AI - 
- Prompting 
- Output Evaluation
- Workflow Optimization

Each stage requires you to maintain a high level of *self-awareness* of your own knowledge limitations while adjusting your *confidence* in both your own abilities and the AI system's capabilities. 

This kind of interaction is very different from classic human-computer interaction, where you're more focused on learning the tool's interface rather than continuously evaluating and adjusting your own cognitive processes and the system's performance. 



### Prompt Crafting

The open-endedness of prompting interfaces today, combined with generative AI's flexibility (in terms of responding to poor prompts), causes non-expert users to make various errors and adopt ineffective strategies. Prompt formulation requires users to have self-awareness of their specific task goals, and be able to decompose their tasks into smaller sub-tasks so as to verbalise these as effective prompts 

::: tip A Large-Scale Survey on the Usability of AI Programming Assistants: Successes and challenges

One developer described their strategy with LLM-supported coding as, *“be incredibly specific with the instructions and write them as precisely as I would for a stupid collaborator”*. [<a href="#ref-3">3</a>]

:::

When manually completing a task, many implicit goals and intentions are embedded within tasks and don't have to be verbalised. **For example**, when writing an email to a senior colleague, one might implicitly know to adopt a certain tone. Many GenAI systems require a specification that the email is to a senior colleague and needs an appropriate tone. Moreover, it often requires that a task be broken up into sub-tasks (“combine my content”, “condense into two paragraphs”, “update the tone”).


> “generative AI systems can generate plausible and correct results for statements at an extremely wide range of abstraction”

This results in a very uniquely human issue while prompting -  

#### The lack of feedback in Generative AI systems

In most other domains, we constantly receive a stream of rich feedback from the environment that lets us judge the effectiveness of our actions. In social learning environments, facial expressions, verbal confirmations, error messages, follow-up questions, and collaborative refinement help us gauge the effectiveness of our communication, and this immediate feedback allows us to update our mental models and adapt to the situation or tool that we're using. 

<img src='/xkcd.png'>

Human-AI interaction lacks immediate and transparent feedback on the effectiveness of prompts. The prompting interface of generative AI systems at this point doesn't provide any indication of key feedback metrics such as *quality of the prompt, indication of whether the prompt was optimally structured, whether important context was missing, or whether alternative formulations might yield superior results*. 

This lack of feedback creates a challenging learning environment where developing **self-monitoring** skills to assess both *your prompting effectiveness* and *quality of AI outputs* is the only way to improve prompting effectiveness. 

Research has shown that this *lack of feedback can lead to overconfidence* in both prompting abilities and *AI output quality*. 

> You may believe that you are communicating effectively with AI systems when, in fact, your prompts contain ambiguities, miss critical context, or fail to align with the AI's training patterns. Without external feedback to calibrate these perceptions, you may persist with suboptimal approaches while remaining unaware of more effective alternatives.

#### Intentional Prompt Design

The challenge of intentional clarity becomes apparent when we examine the multi-layered nature of most professional tasks 

>A business consultant developing strategic recommendations, for instance, must simultaneously consider client-specific constraints, industry dynamics, competitive positioning, implementation feasibility, and organizational change management implications. <br> While a human colleague might intuitively understand these multiple dimensions and ask clarifying questions throughout the collaborative process, <br>

>AI systems require that users explicitly articulate these considerations in their initial prompt formulations.

This demands you to engage in active *metacognative planning*. You must not only identify *what you want to accomplish*, but also *understand why you want to accomplish it*, *what constraints must be considered*, and *how you will be evaluating a good output*. 

<img src='/promptingg.png'>

The iterative process of prompt engineering requires *metacognative flexibility* - to adapt your approach based on the quality of the output. If you are getting irrelevant responses to a query, you need to determine where the issue stems from (unclear prompt formulation, misinterpretation, lack of task detail), and be able to adapt and change your approach while maintaining clear objectives. 

**Developing intentional clarity and maintaining clear awareness of your goals and constraints** also enables you to engage in more sophisticated prompt engineering strategies like *persona-based prompting*, *constraint specification*, and *multi-step reasoning* that leverage AI capabilities more effectively while maintaining alignment with your specific objectives


### Evaluating AI Output: An Exercise in Higher-Order Thinking


The widespread availability of generative AI has shifted user workflows from *content generation* to *content evaluation*, making it crucial to possess both domain expertise and a well-attuned sense of confidence when judging AI-generated outputs. Prior research highlights that a user's *well-adjusted confidence*—both in themselves (self-confidence) and in the system's abilities—is vital in influencing their decision to trust AI outputs.

There is a direct effect on how we use generative AI due to the ease with which large amounts of content can be produced. This abundance moves us from creating content ourselves to evaluating what the AI produces, which requires careful judgment.

> “the subjective ease with which a cognitive task is performed” [<a href="#ref-4">4</a>] —can influence people’s confidence in information accuracy & information retention.<br>

> *For example*, answers to various problems are judged as more correct simply if they are displayed faster to participants after problem descriptions [<a href="#ref-5">5</a>].
>  It can also affect people’s confidence in their memory: the ease with which a memory is retrieved increases participants’ confidence in their later remembering, even though, objectively, easier retrieval was associated with worse future memory performance

> When problems took longer to solve, participants appeared to compromise on their confidence criterion, and were willing to provide solutions with less confidence

These statistics warn us to be especially mindful of the thought and consideration we put into evaluating AI-generated work. Often, the best use of AI is indirect—using its output as a supplement rather than accepting it uncritically.

> For example, participants co-writing with an LLM found that seeing the LLM’s suggestions was helpful even when they did not implement them

When users are not provided with accuracy metrics for AI outputs, they often rely on their own agreement with the output as a shortcut for trust and reliance. This highlights the importance of critical thinking and reflective evaluation in AI-assisted work.


### AI in Your Workflow

The integration of generative AI into programming and creative workflows has brought about profound changes—both promising and challenging. As AI tools become more capable, the cognitive demands on users have shifted rather than diminished. 

Most notably, when users generate large pieces of code with AI—especially when that code contains errors—they are required to constantly switch between coding, reading, and debugging. This frequent context switching dramatically increases cognitive load, making the process more mentally taxing than traditional workflows. As a result, the productivity gains from using generative AI can sometimes be offset by the increased mental effort needed to manage and validate the machine's output.

Some users have reported that tools like GitHub Copilot can inadvertently restructure their workflow in unproductive ways, such as “forcing them to jump in to write code before coming up with a high-level architectural design.” This can lead to a reactive mode of coding, where immediate implementation takes precedence over thoughtful planning. The phenomenon of increased switching costs and workflow restructuring due to automation has long been studied in the human-automation interaction field as the “ironies of automation”—where automation, intended to reduce workload, can actually increase it by introducing new complexities and oversight requirements.

<img src='/automation.png'>

Given these challenges, *self-awareness* becomes vital. Users must evaluate the applicability of generative AI to their particular workflow and maintain well-adjusted confidence in their own skills versus the system's capabilities. This self-assessment boils down to asking: *Do I know whether an available GenAI system can help my workflow? Do I know how to use it effectively in this context? How confident am I in this knowledge?* In end-user programming, this is known as the ‘attention investment’ problem, where users must weigh the potential attention costs saved by automating a task against the costs of configuring and supervising the automation.

User strategies vary. Some take a nuanced approach: 

> “‘I turned off auto-suggest and that made a huge difference. Now I’ll use it when I know I’m doing something repetitive that it’ll get easily, or if I’m not 100 percent sure what I want to do and I’m curious what it suggests. This way I get the help without having it interrupt my thoughts with its suggestions.”’ [<a href="#ref-6">6</a>]

A more advanced pattern emerging among expert users is *chaining*: decomposing a complex task into highly targeted sub-tasks, mapping each to a distinct LLM step, and using the output of one step as the input for the next. This approach not only improves the LLM’s ability to execute complex tasks but also helps users clarify their intentions and make more deliberate edits, increasing self-awareness regarding their own goals. Chaining prompts users to reflect on their processes—leading to more generalizable outputs that better align with broader objectives.

### Explainability and Metacognitive Literacy

A core challenge still facing AI-assisted workflows is the issue of *explainability*—not just in the sense of technical transparency, but as the ability to support users’ understanding so they can achieve their goals. True explainability enables users to reason about what the AI is doing, why it's making certain suggestions, and how to incorporate or reject its output in a way that is meaningful for their task.

Russell [<a href="#ref-7">7</a>] suggested that being literate in the “Age of Google” required a kind of **meta-literacy**—knowing not just what to search for, but also *how* to search and what is possible to accomplish with the tool. In the age of generative AI, this demand for meta-literacy is even greater. As we increasingly offload cognitive work to AI, our *metacognition*—the ability to monitor and adapt our own thinking—becomes the foundation for effective and safe use of these systems.

### Conclusion

The arrival of generative AI has not lessened the need for critical thinking; rather, it has raised the bar for metacognitive skills. Effective collaboration with AI systems now demands that users be intentional in their prompt design, vigilant in their evaluation of outputs, and reflective about when and how to best integrate automation into their workflows. 

Ultimately, becoming an expert AI collaborator is less about mastering a particular tool and more about mastering the self-awareness and metacognitive strategies that allow you to harness AI’s power thoughtfully and responsibly.


## References

<a id="ref-1"></a>[1] Thomas O. Nelson. 1990. Metamemory: A Theoretical Framework and New Findings. In Psychology of Learning and Motivation, Gordon H. Bower (Ed.). Vol. 26. Academic Press, 125–173. https://doi.org/10.1016/S0079-7421(08)60053-5

<a id="ref-2"></a>[2] L. Tankelevitch _et al._, “The Metacognitive Demands and Opportunities of Generative AI,” _arXiv (Cornell University)_, Jan. 2023, doi: 10.48550/arxiv.2312.10893.

<a id="ref-3"></a>[3] J. T. Liang, C. Yang, and B. A. Myers, “A Large-Scale Survey on the Usability of AI Programming Assistants: Successes and challenges,” _arXiv.org_, Mar. 30, 2023. https://arxiv.org/abs/2303.17125

<a id="ref-4"></a>[4] Rakefet Ackerman. 2019. Heuristic Cues for Meta-Reasoning Judgments: Review and Methodology. Psihologijske teme 28, 1 (May 2019), 1–20. https://doi.org/10.31820/pt.28.1.1 Publisher: Filozofski fakultet u Rijeci.

<a id="ref-5"></a>[5] Sascha Topolinski and Rolf Reber. 2010. Immediate truth – Temporal contiguity between a cognitive problem and its solution determines experienced veracity of the solution. Cognition 114, 1 (Jan. 2010), 117–122. https://doi.org/10.1016/j.cognition.2009.09.009

<a id="ref-6"></a>[6] Advait Sarkar, Andrew D. Gordon, Carina Negreanu, Christian Poelitz, Sruti Srinivasa Ragavan, and Ben Zorn. 2022. What is it like to program with artificial intelligence? https://doi.org/10.48550/arXiv.2208.06213 arXiv:2208.06213 [cs].

<a id="ref-7"></a>[7] Design Lab. 2017. What does it mean to be literate in the Age of Google? | Dan Russell | Design@Large. https://www.youtube.com/watch?v=SgOBrYOttZg







