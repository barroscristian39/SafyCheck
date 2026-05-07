import { useState } from 'react';
import { Camera, CheckCircle, XCircle, Circle } from 'lucide-react';

interface ExecutionStepProps {
  state: any;
  onStateChange: (updates: any) => void;
}

type ItemStatus = 'conforme' | 'nao-conforme' | 'nao-aplicavel' | undefined;

export function ExecutionStep({ state, onStateChange }: ExecutionStepProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [itemStatuses, setItemStatuses] = useState<Record<string, ItemStatus>>(
    state.items.reduce((acc: any, item: any, idx: number) => {
      acc[idx] = item.status;
      return acc;
    }, {})
  );
  const [itemNotes, setItemNotes] = useState<Record<string, string>>(
    state.items.reduce((acc: any, item: any, idx: number) => {
      acc[idx] = item.notes || '';
      return acc;
    }, {})
  );

  const currentItem = state.items[currentItemIndex];
  const currentStatus = itemStatuses[currentItemIndex];

  const handleStatusChange = (status: ItemStatus) => {
    setItemStatuses((prev) => ({
      ...prev,
      [currentItemIndex]: status,
    }));
  };

  const handleNoteChange = (note: string) => {
    setItemNotes((prev) => ({
      ...prev,
      [currentItemIndex]: note,
    }));
  };

  const handleNext = () => {
    if (currentItemIndex < state.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  const handleFinish = () => {
    const updatedItems = state.items.map((item: any, idx: number) => ({
      ...item,
      status: itemStatuses[idx],
      notes: itemNotes[idx],
    }));
    onStateChange({ items: updatedItems });
  };

  const completedCount = Object.values(itemStatuses).filter((s) => s !== undefined).length;
  const progressPercentage = Math.round((completedCount / state.items.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Item {currentItemIndex + 1} de {state.items.length}
          </span>
          <span className="text-sm font-semibold text-primary">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary rounded-full h-3 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Current Item */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Item {currentItemIndex + 1}</p>
        <h3 className="text-xl font-semibold text-gray-900">{currentItem.description}</h3>
      </div>

      {/* Status Selection */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-4">Status</label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleStatusChange('conforme')}
            className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
              currentStatus === 'conforme'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-500'
            }`}
          >
            <CheckCircle
              size={24}
              className={currentStatus === 'conforme' ? 'text-green-600' : 'text-gray-400'}
            />
            <span className="text-sm font-medium">Conforme</span>
          </button>

          <button
            onClick={() => handleStatusChange('nao-conforme')}
            className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
              currentStatus === 'nao-conforme'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-500'
            }`}
          >
            <XCircle
              size={24}
              className={currentStatus === 'nao-conforme' ? 'text-red-600' : 'text-gray-400'}
            />
            <span className="text-sm font-medium">Não conforme</span>
          </button>

          <button
            onClick={() => handleStatusChange('nao-aplicavel')}
            className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
              currentStatus === 'nao-aplicavel'
                ? 'border-gray-500 bg-gray-100'
                : 'border-gray-200 hover:border-gray-500'
            }`}
          >
            <Circle
              size={24}
              className={currentStatus === 'nao-aplicavel' ? 'text-gray-600' : 'text-gray-400'}
            />
            <span className="text-sm font-medium">N/A</span>
          </button>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Observações</label>
        <textarea
          value={itemNotes[currentItemIndex]}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="Adicione observações, detalhes ou evidências..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 resize-none"
          rows={3}
        />
      </div>

      {/* Photo Capture */}
      <div>
        <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-colors flex flex-col items-center gap-2 text-gray-600 hover:text-primary">
          <Camera size={24} />
          <span className="font-medium">Adicionar foto</span>
          <span className="text-sm">Clique para capturar ou selecionar imagens</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentItemIndex === 0}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            currentItemIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          Anterior
        </button>

        {currentItemIndex < state.items.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!currentStatus}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              !currentStatus
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-green-700'
            }`}
          >
            Próximo
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={!currentStatus}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
              !currentStatus
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-green-700'
            }`}
          >
            Finalizar Inspeção
          </button>
        )}
      </div>
    </div>
  );
}
