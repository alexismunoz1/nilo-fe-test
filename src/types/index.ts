// Exportar primero los tipos de pokemon y api
export * from './pokemon';
export * from './api';

import type { Pokemon, FuzzyPokemon } from './pokemon';

export interface HeaderProps {
  fixed?: boolean;
}

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface PokemonCardProps {
  pokemon: {
    key: string;
    num: number;
    species: string;
    sprite: string;
    types: Array<{ name: string }>;
    baseStats: {
      hp: number;
      attack: number;
      defense: number;
    };
  };
  isSeen: boolean;
  onToggleSeen: () => void;
}

export interface BannerProps {
  message: string;
  onClose?: () => void;
  duration?: number;
}

export interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export interface TypeBadgeProps {
  typeName: string;
}

export interface PokemonCardBaseProps {
  pokemon: Pokemon | FuzzyPokemon;
  isSeen: boolean;
  onToggleSeen: () => void;
}

export interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface ErrorMessageProps {
  message: string;
  className?: string;
}

export interface EmptyStateProps {
  title: string;
  message: string;
  icon?: 'search';
  className?: string;
}

export interface BackButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export interface SeenEmptyStateProps {
  title: string;
  message: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export interface SeenHeaderProps {
  description: string;
  subtitle: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  cancelButtonLabel: string;
  confirmButtonLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  icon?: boolean;
}
