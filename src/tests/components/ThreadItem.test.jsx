import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ThreadItem from '../../components/ThreadItem';
import React from 'react';

// Mock child components
vi.mock('../../components/UserAvatar', () => ({
  default: ({ user }) => <div data-testid="user-avatar">{user.name}</div>,
}));

describe('ThreadItem component', () => {
  const mockThread = {
    id: 'thread-1',
    title: 'Thread Title',
    body: 'This is the body of the thread',
    category: 'react',
    createdAt: '2023-05-22T10:06:55.588Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 2,
  };

  const mockProps = {
    thread: mockThread,
    authUser: {
      id: 'user-2',
      name: 'Test User',
    },
    onUpVote: vi.fn(),
    onDownVote: vi.fn(),
    getUserName: vi.fn().mockImplementation(() => 'John Doe'),
    userAvatar: 'avatar-url',
  };

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  it('should render correctly with provided props', () => {
    // Act
    renderWithRouter(<ThreadItem {...mockProps} />);

    // Assert
    expect(screen.getByText('Thread Title')).toBeInTheDocument();
    expect(
      screen.getByText('This is the body of the thread')
    ).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getAllByText(/John Doe/).length).toBeGreaterThan(0);
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
    expect(screen.getByText('2 komentar')).toBeInTheDocument();
  });

  it('should truncate long body text and show "Baca selengkapnya" link', () => {
    // Arrange
    const longBody = 'a'.repeat(150); // Create a long string
    const threadWithLongBody = {
      ...mockThread,
      body: longBody,
    };

    // Act
    renderWithRouter(<ThreadItem {...mockProps} thread={threadWithLongBody} />);

    // Assert
    expect(screen.getByText(/^a{100}\.\.\.$/)).toBeInTheDocument(); // Should show first 100 chars with ellipsis
    expect(screen.getByText('Baca selengkapnya')).toBeInTheDocument();
  });

  it('should call onUpVote when up vote button is clicked', async () => {
    // Act
    renderWithRouter(<ThreadItem {...mockProps} />);

    // Setup userEvent
    const user = userEvent.setup();

    // Find and click the up vote button (first button in the component)
    const upVoteButton = screen.getAllByRole('button')[0];
    await user.click(upVoteButton);

    // Assert
    expect(mockProps.onUpVote).toHaveBeenCalledWith(mockThread.id);
  });

  it('should call onDownVote when down vote button is clicked', async () => {
    // Act
    renderWithRouter(<ThreadItem {...mockProps} />);

    // Setup userEvent
    const user = userEvent.setup();

    // Find and click the down vote button (second button in the component)
    const downVoteButton = screen.getAllByRole('button')[1];
    await user.click(downVoteButton);

    // Assert
    expect(mockProps.onDownVote).toHaveBeenCalledWith(mockThread.id);
  });
});
