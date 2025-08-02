import { NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com/repos/sfabara/next-portfolio/commits';

export async function GET() {
  try {
    const response = await fetch(`${GITHUB_API_URL}?per_page=3`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'next-portfolio-app',
        // Optionally add GitHub token for higher rate limits
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits = await response.json();
    
    const formattedCommits = commits.map((commit: any, index: number) => ({
      id: index + 1,
      title: commit.commit.message.split('\n')[0], // First line of commit message
      subtitle: `Commit ${commit.sha.substring(0, 7)}`,
      time: new Date(commit.commit.author.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      hash: commit.sha.substring(0, 7),
      author: commit.commit.author.name,
      url: commit.html_url,
    }));

    return NextResponse.json(formattedCommits);
  } catch (error) {
    console.error('Error fetching commits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch commits' },
      { status: 500 }
    );
  }
} 