---
outline: deep
lastUpdated: 8/5/2026
tags: [AI/ML, Deep Learning, Neural Networks, Math]
wc: 3000
title: "Basics of AI: A Deep Dive into Connectionism"
---
# Basics of AI: A Deep Dive into Connectionism
<Tags :tags="$frontmatter.tags" :wc="$frontmatter.wc" />

Artificial Intelligence is often mystified, but at its core, modern AI—specifically **Deep Learning**—is built upon a foundation called **Connectionism**. This approach models intelligence not as a set of logical rules, but as a network of simple, interconnected processing units, inspired by the biological brain.

In this interactive guide, we will walk through the fundamental building blocks of AI, from the biological neuron to the algorithms that power systems like ChatGPT.

---

## Unit 1: The Biological Inspiration

The human brain consists of approximately 86 billion **neurons**. These are the fundamental units of processing that inspire our artificial networks.

### The Anatomy of a Neuron
A neuron has three key components relevant to our modeling:
1.  **Dendrites**: The "input channels" that collect signals from other neurons.
2.  **Soma (Cell Body)**: The processing unit that sums up the incoming signals.
3.  **Axon**: The "output channel" that transmits a signal (spike) to other neurons if the total input exceeds a certain **threshold**.

```mermaid
graph LR
    A[Dendrites<br>(Inputs)] -->|Collect Signals| B((Soma<br>Summation))
    B -->|Action Potential?| C[Axon<br>(Output)]
    C --> D[Synapse<br>(Connection)]
    D --> E[Next Neuron]
    style B fill:#f9f,stroke:#333,stroke-width:2px
```

### Action Potentials & Synapses
Communication happens via **Action Potentials** (spikes). It is an "all-or-nothing" event. A neuron doesn't fire "a little bit"—it either fires or it doesn't.
The connection betwen neurons is called a **Synapse**. Crucially, synonyms have **weights** (strengths). Some connections are *excitatory* (positive weight, encouraging fire) while others are *inhibitory* (negative weight, discouraging fire).

---

## Unit 2: The Perceptron

In 1943, Warren McCulloch and Walter Pitts proposed the first mathematical model of a neuron. Later refined by Frank Rosenblatt, this became known as the **Perceptron**.

### Mathematical Model
We can model a neuron as a mathematical function:
$$ y = \begin{cases} 1 & \text{if } \sum w_i x_i + b > 0 \\ 0 & \text{otherwise} \end{cases} $$

Where:
*   $x_i$ are the inputs.
*   $w_i$ are the **weights** (synaptic strengths).
*   $b$ is the **bias** (acts like a threshold).
*   $y$ is the output (1 for firing, 0 for silence).

This equation defines a **Decision Boundary**. In 2D, this is just a line that separates data into two classes.

### Interactive Demo: The Perceptron
Try finding a set of weights and bias that separates the **Green** points (Target 1) from the **Red** points (Target 0). This is functioning as an **OR** gate.

<PerceptronDemo />

Notice how changing $w_1$ and $w_2$ rotates the line, while changing $b$ shifts it?

---

## Unit 3: Learning Rules

How do we find the correct weights? We don't want to set them manually. We want the neuron to **learn**.

The **Perceptron Learning Rule** is a simple algorithm to adjust weights iteratively:
$$ w_{new} = w_{old} + \Delta w $$
$$ \Delta w = \eta \cdot (y_{true} - y_{pred}) \cdot x $$

Where:
*   $\eta$ (eta) is the **Learning Rate** (how big of a step to take).
*   $(y_{true} - y_{pred})$ is the **Error**.
    *   If prediction is correct, Error = 0 (no change).
    *   If target is 1 but we predict 0, Error is positive (increase weights).
    *   If target is 0 but we predict 1, Error is negative (decrease weights).

### Convergence
A powerful theorem states: **If a dataset is linearly separable (can be cut by a straight line), the Perceptron Learning Rule is guaranteed to find a solution.**

---

## Unit 4: From Perceptrons to Networks

However, simple perceptrons have a fatal flaw. They can only solve **Linearly Separable** problems.
The most famous counter-example is the **XOR** (Exclusive OR) problem.
*   (0,0) -> 0
*   (0,1) -> 1
*   (1,0) -> 1
*   (1,1) -> 0

No single straight line can separate these outputs! This limitation famously caused the "AI Winter" in the 1970s.

### The Solution: Multi-Layer Perceptrons (MLPs)
By adding a **Hidden Layer** of neurons between the input and output, we can solve non-linear problems.
*   The hidden neurons transform the input space.
*   Each hidden neuron draws its own line.
*   The output neuron combines these "features" to make a complex decision.

### Interactive Demo: The XOR Problem
See how a single line fails, but adding a hidden layer (combining a NAND and OR boundary) solves it.

<XORDemo />

This is the birth of **Neural Networks**.

---

## Unit 5: Training Networks

With multiple layers, the simple perceptron rule doesn't work well. We need a way to assign blame for errors to weights deep inside the network. This is the **Credit Assignment Problem**.

### Gradient Descent
We define a **Loss Function** (or Error Function) $E(w)$ that measures how bad our network is performing. Our goal is to find weights $w$ where $E(w)$ is minimum.
Imagine standing on a foggy mountain (the error landscape). To get to the bottom (minimum error), you should take steps proportional to the slope (**Gradient**) at your feet.

$$ w_{new} = w_{old} - \eta \cdot \nabla E $$

### Interactive Demo: Gradient Descent
Visualize an agent trying to find the minimum of the function $y = x^2$.
*   **Small $\eta$**: Slow convergence.
*   **Large $\eta$**: Overshooting and oscillation.

<GradientDescentDemo />

### Backpropagation
To apply gradient descent to a deep network, we use **Backpropagation**.
1.  **Forward Pass**: Compute outputs and error.
2.  **Backward Pass**: Use the **Chain Rule** of calculus to compute gradients layer by layer, from output back to input.

$$ \frac{\partial E}{\partial w_{hidden}} = \frac{\partial E}{\partial y} \cdot \frac{\partial y}{\partial h} \cdot \frac{\partial h}{\partial w_{hidden}} $$

This algorithm is the engine of the AI revolution, powering everything from AlphaGo to GPT-4.

---

## Conclusion
We've journeyed from the biological neuron to the mathematical perceptron, hit the wall of linearity with XOR, broke through it with Hidden Layers, and learned how to train these massive structures with Gradient Descent and Backpropagation.

This connectionist approach—simple units working together to solve complex problems—is the "Basics of AI" that defines our current era.

---

## Appendix: TikZ Diagram Test

Here is a sample LaTeX diagram rendered using TikZJax:

```tikz
\begin{tikzpicture}
  \draw[fill=blue!20] (0,0) circle (1cm) node {Input};
  \draw[->, thick] (1.2,0) -- (2.8,0) node[midway, above] {Weight};
  \draw[fill=red!20] (4,0) circle (1cm) node {Neuron};
\end{tikzpicture}
```

---