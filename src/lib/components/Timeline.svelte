<script lang="ts">
	import { onMount } from 'svelte';

	let sectionEl: HTMLElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) visible = true; },
			{ threshold: 0.1 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});

	const entries = [
		{
			company: 'Skan AI',
			role: 'ML Engineer',
			dates: '2024–2025',
			description: 'Building agentic AI systems, LLM pipelines, RAG architectures, and multi-agent workflows for enterprise process intelligence.',
			tags: ['LLMs', 'Multi-Agent', 'RAG', 'FastAPI', 'Python']
		},
		{
			company: 'Aurora Engineering',
			role: 'Data Scientist',
			dates: '2023–2024',
			description: 'Deep learning on NASA MMS satellite telemetry. Built pipelines to recover missing sensor data and compute pitch angles from space plasma instruments.',
			tags: ['Deep Learning', 'Time Series', 'NASA', 'PyTorch', 'Signal Processing']
		},
		{
			company: 'C5i (Course5 Intelligence)',
			role: 'Data Science Consultant',
			dates: '2020–2023',
			description: 'Enterprise analytics for Fortune 500 clients. Customer segmentation, Bayesian marketing mix modeling, A/B testing, demand forecasting.',
			tags: ['Product Analytics', 'Marketing Analytics', 'Segmentation', 'Statistical Modeling and Analysis', 'A/B Testing', 'Forecasting', 'Python', 'R']
		}
	];
</script>

<div class="timeline" bind:this={sectionEl}>
	{#each entries as entry, i}
		<div
			class="timeline__item"
			class:timeline__item--visible={visible}
			style="transition-delay: {i * 0.15}s"
		>
			<div class="timeline__marker">
				<span class="timeline__dot"></span>
				{#if i < entries.length - 1}
					<span class="timeline__line"></span>
				{/if}
			</div>
			<div class="timeline__content">
				<div class="timeline__header">
					<h3 class="timeline__company">{entry.company}</h3>
					<span class="timeline__dates">{entry.dates}</span>
				</div>
				<p class="timeline__role">{entry.role}</p>
				<p class="timeline__desc">{entry.description}</p>
				<div class="timeline__tags">
					{#each entry.tags as tag}
						<span class="timeline__tag">{tag}</span>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin-bottom: 5rem;
	}

	.timeline__item {
		display: flex;
		gap: 1.5rem;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.5s var(--ease-smooth), transform 0.5s var(--ease-smooth);
	}

	.timeline__item--visible {
		opacity: 1;
		transform: translateY(0);
	}

	.timeline__marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		padding-top: 0.35rem;
	}

	.timeline__dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--color-accent);
		flex-shrink: 0;
		transition: box-shadow 0.3s var(--ease-smooth);
	}

	.timeline__item:hover .timeline__dot {
		box-shadow: 0 0 0 4px var(--color-accent-light);
	}

	.timeline__line {
		width: 2px;
		flex: 1;
		background: var(--color-border);
		min-height: 2rem;
	}

	.timeline__content {
		padding-bottom: 2.5rem;
	}

	.timeline__header {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.timeline__company {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--color-text);
		margin: 0;
	}

	.timeline__dates {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-muted);
	}

	.timeline__role {
		font-size: 0.9rem;
		color: var(--color-muted);
		margin: 0.25rem 0 0.75rem;
	}

	.timeline__desc {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--color-text);
		margin: 0 0 0.75rem;
		max-width: 560px;
	}

	.timeline__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.timeline__tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-muted);
		background: var(--color-tag);
		padding: 0.25rem 0.6rem;
		border-radius: 4px;
	}
</style>
