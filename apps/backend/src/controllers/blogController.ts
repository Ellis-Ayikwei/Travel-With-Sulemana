import { Request, Response } from 'express';
import prisma from '../db';

const parseJsonArray = (value: string | null | undefined) => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const stringifyArray = (value: any) => {
  if (!value) return JSON.stringify([]);
  return JSON.stringify(Array.isArray(value) ? value : [value]);
};

// Get all blog posts
export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const { published, featured, category } = req.query;
    const where: any = {};

    if (published !== undefined) where.published = published === 'true';
    if (featured !== undefined) where.featured = featured === 'true';
    if (category) where.category = String(category).toUpperCase().replace(/\s+/g, '_');

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { date: 'desc' },
    });
    res.json(
      posts.map((post) => ({
        ...post,
        tags: parseJsonArray(post.tags),
      }))
    );
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Get single blog post
export const getBlogPost = async (req: Request, res: Response) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
    });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({
      ...post,
      tags: parseJsonArray(post.tags),
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Create blog post (admin only)
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, excerpt, content, category, author, image, featured, readTime, tags, published } = req.body;

    if (!title || !excerpt || !content || !category || !image || !readTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content,
        category: String(category).toUpperCase().replace(/\s+/g, '_'),
        author: author || 'Sulemana',
        image,
        featured: featured || false,
        readTime,
        tags: stringifyArray(tags),
        published: published !== undefined ? published : true,
        date: new Date(),
      },
    });

    res.status(201).json({
      ...post,
      tags: parseJsonArray(post.tags),
    });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Update blog post (admin only)
export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, excerpt, content, category, author, image, featured, readTime, tags, published } = req.body;

    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: {
        title,
        excerpt,
        content,
        category: category ? String(category).toUpperCase().replace(/\s+/g, '_') : undefined,
        author,
        image,
        featured,
        readTime,
        tags: tags !== undefined ? stringifyArray(tags) : undefined,
        published,
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({
      ...post,
      tags: parseJsonArray(post.tags),
    });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};

// Delete blog post (admin only)
export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const post = await prisma.blogPost.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(500).json({ error: (error as any).message });
  }
};
