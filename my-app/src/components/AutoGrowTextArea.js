export default function AutoGrowTextArea({ value, onChange }) {
    return (
      <div
        className="auto-grow-input"
        style={{
          display: 'inline-grid',
          alignItems: 'stretch',
          padding: 8,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      >
        <textarea
          rows="1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={{
            gridArea: '1 / 1 / 2 / 2',
            width: '100%',
            padding: 0,
            border: 'none',
          }}
        />
        <span
          style={{
            gridArea: '1 / 1 / 2 / 2',
            visibility: 'hidden',
            whiteSpace: 'pre-wrap',
          }}
        >
          {value}{' '}
        </span>
      </div>
    )
  }