// src/TimersManager.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TimersManager from './TimersManager';

test('Ajout d\'un minuteur', () => {
  render(<TimersManager />);
  // Simule l'ajout d'un minuteur avec des valeurs valides
  fireEvent.change(screen.getByPlaceholderText('Heures'), { target: { value: '1' } });
  fireEvent.change(screen.getByPlaceholderText('Minutes'), { target: { value: '30' } });
  fireEvent.change(screen.getByPlaceholderText('Secondes'), { target: { value: '0' } });
  fireEvent.click(screen.getByText('Ajouter un minuteur'));
  // Vérifie si le minuteur est ajouté à la liste
  expect(screen.getByText('01:30:00')).toBeInTheDocument();
});
